#!/usr/bin/env node
import { Command } from "commander";
import packageJson from "../package.json" with { type: "json" };

const program = new Command();

program
	.name(packageJson.name)
	.description(packageJson.description)
	.version(packageJson.version);

// Parse argv to execute the CLI
program.parseAsync(process.argv);
