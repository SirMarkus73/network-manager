#!/usr/bin/env node
import { Command, createOption } from "commander";
import packageJson from "../package.json" with { type: "json" };
import { commands } from "./actions/action.js";
import { wifiCommand } from "./commands/wifi/command.js";

const program = new Command();

program.name(packageJson.name);
program.description(packageJson.description);
program.version(packageJson.version);

program.addCommand(wifiCommand);

const commandOption = createOption(
	"-C, --commands",
	"List all available commands",
);

program.addOption(commandOption).action((options) => {
	if (!options.commands) {
		program.help();
	}

	console.log("Available commands:");
	console.log(
		program.commands.map((cmd) => commands(cmd as Command)).join("\n"),
	);
});

// Parse argv to execute the CLI
program.parseAsync(process.argv);
