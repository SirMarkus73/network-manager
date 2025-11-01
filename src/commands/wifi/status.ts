import { Command, Flags } from "@oclif/core";
import chalk from "chalk";
import { createSpinner } from "nanospinner";
import { getWifiStatus } from "@/actions/wifi/status/action.js";
import { WIFI_CHOICES } from "@/constants/wifi.js";
import { formatWifiTable } from "@/lib/formatWifiTable.js";
import type { WifiFieldName } from "@/types/wifi.js";

export default class WifiStatus extends Command {
	static override description =
		"List the current status of the connected network";
	static override examples = ["<%= config.bin %> <%= command.id %>"];
	static override flags = {
		// flag with a value (-n, --name=VALUE)
		fields: Flags.string({
			char: "f",
			description: "fields to display",
			multiple: true,
			default: ["active", "ssid", "bssid", "signal", "chan"],
			options: WIFI_CHOICES,
		}),
	};

	public async run(): Promise<void> {
		const { flags } = await this.parse(WifiStatus);

		const fields = (
			flags.fields.includes("active")
				? flags.fields
				: ["active", ...flags.fields]
		) as WifiFieldName[];

		const spinner = createSpinner("Fetching WiFi status...").start();
		const connections = await getWifiStatus(fields);
		spinner.success("Fetched WiFi status");

		if (!connections) {
			this.log(chalk.red("You are not connected to any WiFi network."));
			return;
		}

		const table = formatWifiTable(fields, [connections]);
		this.log(table);
	}
}
