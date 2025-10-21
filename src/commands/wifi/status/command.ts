import { createCommand, Option } from "commander";
import { getWifiStatus } from "../../../actions/wifi/status/action.js";
import { WIFI_FIELD_NAMES } from "../../../types/wifi.js";

export const statusCommand = createCommand("status");

statusCommand.description("List the current status of the connected network");
statusCommand.alias("ps");

const fieldOption = new Option("-f, --fields <FIELD...>", "Fields to display")
	.default(["active", "ssid", "bssid", "signal", "chan"])
	.choices(WIFI_FIELD_NAMES);

statusCommand.addOption(fieldOption).action(async (options) => {
	const connections = await getWifiStatus(options.fields);

	console.table(connections);
});
