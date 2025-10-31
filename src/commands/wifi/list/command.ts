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

listCommand.addOption(fieldOption).action(async (options) => {
	const fields: WifiFieldName[] = Array.from(options.fields);

	const spinner = createSpinner("Fetching WiFi connections...").start();
	const connections = await getWifiConnections(fields);

	spinner.success("Fetched WiFi connections");

	const table = formatWifiTable(fields, connections);

	console.log(table);
});
