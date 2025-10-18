import { exec } from "../../../lib/exec.js";
import type { ConnectionList, WifiFieldName } from "../../../types/wifi.js";

export async function getWifiConnections<F extends readonly WifiFieldName[]>(
	fieldNames: F,
): Promise<ConnectionList<F>> {
	const { stdout: connectionsStr } = await exec(
		`LANG=C nmcli -t --fields ${fieldNames.join(",")} device wifi list`,
	);

	const connections: ConnectionList<F> = connectionsStr
		.trim()
		.split("\n")
		.map((line) => {
			const lines = line
				.replace(/\\:/g, ";")
				.split(":")
				.map((field) => field.replace(/;/g, ":"));

			const parsedLines: Partial<Record<F[number], string | boolean | null>> =
				{};

			for (const [index, field] of fieldNames.entries()) {
				const fieldValue = lines[index];

				if (fieldValue && field === "active") {
					parsedLines[field as F[number]] = fieldValue === "yes";
					continue;
				}

				if (!fieldValue || fieldValue === "(none)") {
					parsedLines[field as F[number]] = null;
					continue;
				}

				parsedLines[field as F[number]] = fieldValue;
			}

			return parsedLines as Record<F[number], string | boolean | null>;
		});

	return connections;
}
