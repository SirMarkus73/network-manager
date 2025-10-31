import type { WifiFieldName, WifiFieldValue, WifiRow } from "@/types/wifi.js";

export function formatWifiFields(
	fields: WifiFieldName[],
	rows: string[][],
): WifiRow[] {
	const formattedRows: WifiRow[] = [];

	for (const row of rows) {
		const formattedRow: WifiRow = Object.fromEntries(
			fields.map((field, index) => {
				const value = row[index];
				let parsedValue: WifiFieldValue;

				if (field === "active") {
					parsedValue = value === "yes";
				} else if (
					field === "bssid" ||
					field === "ssid" ||
					field === "mode" ||
					field === "rsn-flags" ||
					field === "wpa-flags" ||
					field === "security"
				) {
					const temp = String(value).trim();
					parsedValue = temp === "" ? undefined : temp;
				} else if (field === "chan" || field === "freq" || field === "signal") {
					const temp = Number(value);
					parsedValue = Number.isNaN(temp) ? undefined : temp;
				}

				return [field, parsedValue];
			}),
		);

		formattedRows.push(formattedRow);
	}

	return formattedRows;
}
