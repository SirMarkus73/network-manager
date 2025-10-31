import { exec } from "@/lib/exec.js";
import { formatWifiFields } from "@/lib/wifi/formatWifiFields.js";
import type { WifiFieldName, WifiRow } from "@/types/wifi.js";

export async function getWifiStatus(
	fields: WifiFieldName[],
): Promise<WifiRow | undefined> {
	const { stdout } = await exec(
		`LANG=C nmcli -t -f ${fields.join(",")} device wifi list --rescan no`,
	);

	const lines = stdout
		.trim()
		.split("\n")
		.map((line) =>
			line
				.replace(/\\:/g, ";")
				.split(":")
				.map((field) => field.replace(/;/g, ":")),
		);

	const status = formatWifiFields(fields, lines).filter((row) => row.active)[0];

	return status;
}
