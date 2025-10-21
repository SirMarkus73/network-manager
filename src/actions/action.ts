import type { Command } from "commander";

export function commands(cmd: Command, depth: number = 0): string {
	let subCommands: string = "";

	for (const subCmd of cmd.commands) {
		subCommands += `${"  ".repeat(depth)}| ${subCmd.name()}\n`;
		subCommands += commands(subCmd as Command, depth + 1);
	}

	if (depth === 0) {
		subCommands = `${cmd.name()}\n${subCommands}`;
		return subCommands.trim();
	}

	return subCommands;
}
