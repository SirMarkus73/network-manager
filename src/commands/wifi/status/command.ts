import { createCommand, Option } from "commander";
import { createSpinner } from "nanospinner";
import { getWifiStatus } from "@/actions/wifi/status/action.js";
import { WIFI_FIELD_NAMES } from "@/constants/wifi.js";

export const statusCommand = createCommand("status");

statusCommand.description("List the current status of the connected network");
statusCommand.alias("ps");

const fieldOption = new Option("-f, --fields <FIELD...>", "Fields to display")
	.default(["active", "ssid", "bssid", "signal", "chan"])
	.choices(WIFI_FIELD_NAMES);

statusCommand.addOption(fieldOption).action(async (options) => {
	const spinner = createSpinner("Fetching WiFi status...").start();
	const connections = await getWifiStatus(options.fields);
	spinner.success("Fetched WiFi status");

	console.table(connections);
});
