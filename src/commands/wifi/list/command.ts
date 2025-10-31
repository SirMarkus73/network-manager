import ansi from "ansi-escapes";
import { createCommand, Option } from "commander";
import { createSpinner } from "nanospinner";
import { getWifiConnections } from "@/actions/wifi/list/action.js";
import { WIFI_CHOICES } from "@/constants/wifi.js";
import { formatWifiTable } from "@/lib/formatWifiTable.js";
import type { WifiFieldName } from "@/types/wifi.js";
export const listCommand = createCommand("list");

listCommand.description("List available WiFi connections");
listCommand.alias("ls");

const fieldOption = new Option("-f, --fields <FIELD...>", "Fields to display")
	.default(["active", "ssid", "bssid", "signal", "chan"])
	.choices(WIFI_CHOICES);

const watchOption = new Option("-w, --watch", "Watch changes");

listCommand
	.addOption(fieldOption)
	.addOption(watchOption)
	.action(async (options) => {
		process.stdout.write("\x1B[2J\x1B[0f");

		const fields: WifiFieldName[] = Array.from(options.fields);
		const spinner = createSpinner("Fetching WiFi connections...").start();
		const connections = await getWifiConnections(fields);
		spinner.success("Fetched WiFi connections");

		const table = formatWifiTable(fields, connections);
		process.stdout.write(ansi.clearScreen + table);

		if (!options.watch) {
			return;
		}

		// Configure stdin to listen for 'q' keypress to exit
		process.stdin.setRawMode(true);
		process.stdin.setEncoding("utf8");
		process.stdin.resume();

		process.stdin.on("data", (key: string) => {
			if (key.toLowerCase() === "q" || key === "\u0003") {
				process.stdout.write(ansi.cursorShow);
				process.stdin.setRawMode(false);
				process.stdin.pause();
				process.exit(0);
			}
		});

		// Hide the cursor
		process.stdout.write(ansi.cursorHide);

		// Start watching for changes
		let previous = table;

		setInterval(async () => {
			const newConnections = await getWifiConnections(fields);
			const current = formatWifiTable(fields, newConnections);

			if (current !== previous) {
				previous = current;
				process.stdout.write(
					`${ansi.cursorTo(0, 0) + ansi.eraseDown + current}\nPress 'q' to exit the app\n`,
				);
			}
		}, 1000);
	});
