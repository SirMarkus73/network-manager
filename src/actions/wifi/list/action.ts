import { exec } from "@/lib/exec.js";
import { formatWifiFields } from "@/lib/wifi/formatWifiFields.js";
import type { WifiFieldName, WifiRow } from "@/types/wifi.js";

export async function getWifiConnections(
	fields: WifiFieldName[],
): Promise<WifiRow[]> {
	const { stdout: connectionsStr } = await exec(
		`LANG=C nmcli -t --fields ${fields.join(",")} device wifi list`,
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
