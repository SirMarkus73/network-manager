import { password as passwordPrompt } from "@inquirer/prompts";
import { Args, Command, Flags } from "@oclif/core";
import { createSpinner } from "nanospinner";

import {
	connectAction,
	connectInteractiveAction,
} from "@/actions/wifi/connect/action.js";

export default class WifiConnect extends Command {
	static override args = {
		SSID: Args.string({ description: "SSID of the WiFi network" }),
	};
	static override description = "Connect to a WiFi network";
	static override examples = ["<%= config.bin %> <%= command.id %>"];
	static override flags = {
		password: Flags.string({
			char: "p",
			description: "Password of the connection",
		}),

		interactive: Flags.string({
			char: "i",
			description: "Enable interactive mode",
		}),
	};

	public async run(): Promise<void> {
		const { args, flags } = await this.parse(WifiConnect);

		const spinner = createSpinner("Connecting to WiFi...");
		// Validate: interactive mode cannot be combined with SSID or password
		if (flags.interactive && (args.SSID || flags.password)) {
			this.error(
				"Interactive mode cannot be used with SSID or password options",
				{ exit: 2, code: "PARAMETER_ERR" },
			);
		}

		// Validate: password requires SSID
		if (flags.password && !args.SSID) {
			this.error("Password option requires SSID argument", {
				code: "PARAMETER_ERR",
				exit: 2,
			});
		}

		// Interactive mode
		if (flags.interactive) {
			connectInteractiveAction();
			return;
		}

		// Direct connection mode with SSID
		if (args.SSID) {
			const connectionPassword =
				flags.password ||
				(await passwordPrompt({
					message: "Password of the wifi:",
					mask: true,
				}));
			spinner.start();
			try {
				await connectAction(args.SSID, connectionPassword);
				spinner.success("Connected to WiFi");
			} catch (error: unknown) {
				if (error instanceof Error) {
					spinner.error(error.message);
				} else {
					spinner.error("Unknown error");
				}
			}
			return;
		}

		// Default: no SSID provided, use interactive mode
		connectInteractiveAction();
	}
}
