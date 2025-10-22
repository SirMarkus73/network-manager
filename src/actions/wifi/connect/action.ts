import { password, select } from "@inquirer/prompts";
import { program } from "commander";
import { exec } from "../../../lib/exec.js";
import { getWifiConnections } from "../list/action.js";

export async function connectAction(SSID: string, password: string) {
	try {
		await exec(`nmcli device wifi connect "${SSID}" password "${password}"`);
	} catch (_e) {
		program.error(`Unable to connect wifi with SSID: ${SSID}`, {
			code: "CONN_ERR",
			exitCode: 2,
		});
	}
}

export async function connectInteractiveAction() {
	const connections = await getWifiConnections([
		"active",
		"ssid",
		"security",
		"signal",
	]);

	const options = connections
		.filter((conn) => conn.ssid)
		.map((conn) => ({
			name: `(${conn.security}) - (${conn.signal} / 100) | ${conn.ssid}`,
			value: String(conn.ssid),
			disabled: Boolean(conn.active) ? "Currently connected..." : false,
		}));

	const wifiSSID = await select({
		message: "Wifi SSID to connect",
		choices: options,
	});

	const wifiPassword = await password({
		message: "Introduce la contraseña de la red wifi",
		mask: "*",
	});

	await connectAction(wifiSSID, wifiPassword);
}
