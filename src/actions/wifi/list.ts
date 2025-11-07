import type { Spinner } from "nanospinner";
import { exec } from "@/lib/exec.js";
import { formatWifiFields } from "@/lib/wifi/formatWifiFields.js";
import type { WifiFieldName, WifiRow } from "@/types/wifi.js";

export async function getWifiConnections(
	fields: WifiFieldName[],
	force = false,
): Promise<WifiRow[]> {
	const { stdout: connectionsStr } = await exec(
		`LANG=C nmcli -t --fields ${fields.join(",")} device wifi list --rescan ${force ? "yes" : "auto"}`,
	);

	const rows = connectionsStr
		.trim()
		.split("\n")
		.map((line) =>
			line
				.replace(/\\:/g, ";")
				.split(":")
				.map((field) => field.replace(/;/g, ":")),
		);

	return formatWifiFields(fields, rows);
}

export async function* watchWifiConnections(
	fields: WifiFieldName[],
	spinner?: Spinner,
	refreshInterval = 1000,
): AsyncGenerator<WifiRow[]> {
	while (true) {
		if (spinner) {
			spinner.start("Updating wifi connections...");
		}

		const connections = await getWifiConnections(fields, true);

		if (spinner) {
			spinner.success("Fetched WiFi connections");
		}

		yield connections;
		await new Promise((resolve) => setTimeout(resolve, refreshInterval));
	}
}
