import chalk from "chalk";
import Table from "cli-table3";
import type { WifiFieldName, WifiRow } from "@/types/wifi.js";

export function formatWifiTable(
	headers: WifiFieldName[],
	connections: WifiRow[],
) {
	const table = new Table({ head: headers });
	const parsedValues = connections.map((val) => {
		return Object.values({
			...val,
			active: val.active ? chalk.green("\u2714") : chalk.red("\u2716"),
		});
	});

	table.push(...Array.from(Object.values(parsedValues)));

	return table.toString();
}
