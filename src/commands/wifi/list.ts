import { Command, Flags } from "@oclif/core";
import ansi from "ansi-escapes";
import { createSpinner } from "nanospinner";
import {
	getWifiConnections,
	watchWifiConnections,
} from "@/actions/wifi/list.js";
import { WIFI_CHOICES } from "@/constants/wifi.js";
import { formatWifiTable } from "@/lib/formatWifiTable.js";
import type { WifiFieldName } from "@/types/wifi.js";

export default class WifiList extends Command {
	static override description = "List available WiFi connections";
	static override examples = ["<%= config.bin %> <%= command.id %>"];
	static override flags = {
		// flag with no value (-f, --force)
		watch: Flags.boolean({ char: "w" }),
		// flag with a value (-n, --name=VALUE)
		name: Flags.string({ char: "n", description: "name to print" }),
		fields: Flags.string({
			char: "f",
			description: "Fields to display",
			multiple: true,
			default: ["active", "ssid", "bssid", "signal", "chan"],
			options: WIFI_CHOICES,
		}),
		json: Flags.boolean({
			char: "j",
			description: "output in JSON format",
			default: false,
		}),
	};

	public async run(): Promise<void> {
		const { flags } = await this.parse(WifiList);
		const fields = (
			flags.fields.includes("active")
				? flags.fields
				: ["active", ...flags.fields]
		) as WifiFieldName[];

		process.stdout.write(ansi.clearTerminal);

		if (!flags.watch) {
			const spinner = createSpinner("Fetching WiFi connections...").start();
			const connections = await getWifiConnections(fields);
			spinner.success("Fetched WiFi connections");

			if (flags.json) {
				this.log(JSON.stringify(connections, null, 2));
				return;
			}

			const table = formatWifiTable(fields, connections);
			this.log(table);

			this.exit(0);
		}

		// Configure stdin to listen for 'q' keypress to exit
		process.stdin.setRawMode(true);
		process.stdin.setEncoding("utf8");
		process.stdin.resume();

		process.stdin.on("data", (key: string) => {
			if (key.toLowerCase() === "q" || key === "\u0003") {
				process.stdout.write("\n");
				process.stdout.write(ansi.cursorShow);
				process.stdin.setRawMode(false);
				process.stdin.pause();
				process.exit(0);
			}
		});

		// Hide the cursor
		process.stdout.write(ansi.cursorHide);

		// Start watching for changes

		if (flags.json) {
			let previousJson = "";

			for await (const connections of watchWifiConnections(
				fields,
				undefined,
				2000,
			)) {
				const currentJson = JSON.stringify(connections, null, 2);

				if (currentJson !== previousJson) {
					previousJson = currentJson;
					this.log(currentJson);
				}
			}
		}

		let previous = "";
		const spinner = createSpinner();

		for await (const connections of watchWifiConnections(
			fields,
			spinner,
			2000,
		)) {
			const current = formatWifiTable(fields, connections);

			if (current !== previous) {
				previous = current;
				process.stdout.write(
					`${ansi.cursorTo(0, 0)}${ansi.eraseDown}${ansi.cursorHide}${current}\nPress 'q' to exit the app\n`,
				);
			}
		}
	}
}
