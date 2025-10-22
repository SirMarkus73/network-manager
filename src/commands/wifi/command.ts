import { createCommand } from "commander";
import { listCommand } from "./list/command.js";
import { statusCommand } from "./status/command.js";

export const wifiCommand = createCommand("wifi");

wifiCommand.description("Manage WiFi connections");

wifiCommand.addCommand(listCommand);
wifiCommand.addCommand(statusCommand);
