import { password as passwordPrompt } from "@inquirer/prompts";
import { createArgument, createCommand, createOption } from "commander";
import { createSpinner } from "nanospinner";
import {
	connectAction,
	connectInteractiveAction,
} from "@/actions/wifi/connect/action.js";

export const connectCommand = createCommand("connect");

connectCommand.description("Connect to a wifi");
connectCommand.alias("c");

const passwordOption = createOption(
	"-P, --password <PASSWORD>",
	"Password of the connection",
);
const SSIDArgument = createArgument("[SSID]", "SSID of the wifi to connect");
const interactiveOption = createOption(
	"-I, --interactive",
	"Connect to a wifi network with a select",
);

connectCommand
	.addArgument(SSIDArgument)
	.addOption(passwordOption)
	.addOption(interactiveOption)
	.action(async (SSID, { password, interactive }) => {
		const spinner = createSpinner("Connecting to WiFi...");
		// Validate: interactive mode cannot be combined with SSID or password
		if (interactive && (SSID || password)) {
			connectCommand.error(
				"Interactive mode cannot be used with SSID or password options",
				{ exitCode: 2, code: "PARAMETER_ERR" },
			);
			return;
		}

		// Validate: password requires SSID
		if (password && !SSID) {
			connectCommand.error("Password option requires SSID argument", {
				exitCode: 2,
				code: "PARAMETER_ERR",
			});
			return;
		}

		// Interactive mode
		if (interactive) {
			connectInteractiveAction();
			return;
		}

		// Direct connection mode with SSID
		if (SSID) {
			const connectionPassword =
				password ||
				(await passwordPrompt({
					message: "Password of the wifi:",
					mask: true,
				}));
			spinner.start();
			try {
				await connectAction(SSID, connectionPassword);
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
	});
