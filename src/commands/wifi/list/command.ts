import { createCommand, Option } from "commander";
import { getWifiConnections } from "../../../actions/wifi/list/action.js";
import { WIFI_FIELD_NAMES } from "../../../types/wifi.js";

export const listCommand = createCommand("list");

listCommand.description("List available WiFi connections");
listCommand.alias("ls");

const fieldOption = new Option("-f, --fields <FIELD...>", "Fields to display")
	.default(["active", "ssid", "bssid", "signal", "chan"])
	.choices(WIFI_FIELD_NAMES);

listCommand.addOption(fieldOption);

listCommand.action(async (options) => {
	const connections = await getWifiConnections(options.fields);

	console.table(connections);
});
