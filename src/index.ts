#!/usr/bin/env node
import { Command } from "commander";
import packageJson from "../package.json" with { type: "json" };
import { wifiCommand } from "./commands/wifi/command.js";

const program = new Command();

program.name(packageJson.name);
program.description(packageJson.description);
program.version(packageJson.version);

program.addCommand(wifiCommand);

// Parse argv to execute the CLI
program.parseAsync(process.argv);
