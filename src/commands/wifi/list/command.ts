import { createCommand, Option } from "commander";
import { createSpinner } from "nanospinner";
import { getWifiConnections } from "@/actions/wifi/list/action.js";
import { WIFI_FIELD_NAMES } from "@/constants/wifi.js";

export const listCommand = createCommand("list");

listCommand.description("List available WiFi connections");
listCommand.alias("ls");

const fieldOption = new Option("-f, --fields <FIELD...>", "Fields to display")
	.default(["active", "ssid", "bssid", "signal", "chan"])
	.choices(WIFI_FIELD_NAMES);

listCommand.addOption(fieldOption).action(async (options) => {
	const spinner = createSpinner("Fetching WiFi connections...").start();
	const connections = await getWifiConnections(options.fields);

	spinner.success("Fetched WiFi connections");

	console.table(connections);
});
