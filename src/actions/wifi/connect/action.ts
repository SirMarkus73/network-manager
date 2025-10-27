import { password, select } from "@inquirer/prompts";
import { createSpinner } from "nanospinner";
import { getWifiConnections } from "@/actions/wifi/list/action.js";
import { exec } from "@/lib/exec.js";

export async function connectAction(SSID: string, password: string) {
	try {
		await exec(`nmcli device wifi connect "${SSID}" password "${password}"`);
	} catch (_e) {
		throw new Error(`Unable to connect wifi with SSID: ${SSID}`);
	}
}

export async function connectInteractiveAction() {
	const fetchSpinner = createSpinner("Fetching WiFi connections...").start();
	const connections = await getWifiConnections([
		"active",
		"ssid",
		"security",
		"signal",
	]);
	fetchSpinner.success("Fetched WiFi connections");

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

	const connectSpinner = createSpinner("Connecting to WiFi...").start();

	try {
		await connectAction(wifiSSID, wifiPassword);
		connectSpinner.success("Connected to WiFi");
	} catch (error: unknown) {
		if (error instanceof Error) {
			connectSpinner.error(error.message);
		} else {
			connectSpinner.error("Unknown error");
		}
	}
}
