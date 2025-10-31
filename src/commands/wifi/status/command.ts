import chalk from "chalk";
import { createCommand, Option } from "commander";
import { createSpinner } from "nanospinner";
import { getWifiStatus } from "@/actions/wifi/status/action.js";
import { WIFI_CHOICES } from "@/constants/wifi.js";
import { formatWifiTable } from "@/lib/formatWifiTable.js";
import type { WifiFieldName } from "@/types/wifi.js";

export const statusCommand = createCommand("status");

statusCommand.description("List the current status of the connected network");
statusCommand.alias("ps");

const fieldOption = new Option("-f, --fields <FIELD...>", "Fields to display")
	.default(["active", "ssid", "bssid", "signal", "chan"])
	.choices(WIFI_CHOICES);

statusCommand.addOption(fieldOption).action(async (options) => {
	const fields: WifiFieldName[] = Array.from(options.fields);
	const spinner = createSpinner("Fetching WiFi status...").start();
	const connections = await getWifiStatus(fields);
	spinner.success("Fetched WiFi status");

	if (!connections) {
		console.log(chalk.red("You are not connected to any WiFi network."));
		return;
	}

	const table = formatWifiTable(fields, [connections]);
	console.log(table);
});
