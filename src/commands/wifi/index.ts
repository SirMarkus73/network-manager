import { Command } from "@oclif/core";

export default class WifiGroup extends Command {
	static description =
		"Manage WiFi networks (list, connect, view status, etc.)";

	async run() {
		// Mostrar la ayuda para el grupo 'wifi'
		await this.config.runCommand("help", ["wifi"]);
	}
}
