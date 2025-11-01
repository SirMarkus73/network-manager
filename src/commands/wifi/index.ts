import { Command } from "@oclif/core";

export default class WifiGroup extends Command {
	static description =
		"Manage WiFi networks (list, connect, view status, etc.)";

	async run() {
		this.parse(WifiGroup);

		// Show help by default
		await this.config.runCommand("help", ["wifi"]);
	}
}
