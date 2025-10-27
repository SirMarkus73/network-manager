import { createCommand } from "commander";
import { connectCommand } from "@/commands/wifi/connect/command.js";
import { listCommand } from "@/commands/wifi/list/command.js";
import { statusCommand } from "@/commands/wifi/status/command.js";

export const wifiCommand = createCommand("wifi");

wifiCommand.description("Manage WiFi connections");

wifiCommand.addCommand(listCommand);
wifiCommand.addCommand(statusCommand);
wifiCommand.addCommand(connectCommand);
