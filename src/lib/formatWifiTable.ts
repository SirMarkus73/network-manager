import chalk from "chalk";
import Table from "cli-table3";
import type { WifiFieldName } from "@/types/wifi.js";

export function formatWifiTable(
	headers: WifiFieldName[],
	connections: Partial<Record<WifiFieldName, string | boolean | null>>[],
) {
	const table = new Table({ head: headers });
	const parsedValues = connections.map((val) => {
		val.active = val.active ? chalk.green("\u2714") : chalk.red("\u2716");
		return Object.values(val);
	});

	table.push(...parsedValues);

	return table.toString();
}
