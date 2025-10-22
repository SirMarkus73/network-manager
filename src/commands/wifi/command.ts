import { createCommand } from "commander";
import { connectCommand } from "./connect/command.js";
import { listCommand } from "./list/command.js";
import { statusCommand } from "./status/command.js";

export const wifiCommand = createCommand("wifi");

wifiCommand.description("Manage WiFi connections");

wifiCommand.addCommand(listCommand);
wifiCommand.addCommand(statusCommand);
wifiCommand.addCommand(connectCommand);
