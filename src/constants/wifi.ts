import type { WifiFieldName } from "@/types/wifi.js";

export const WIFI_CHOICES: WifiFieldName[] = [
	"active",
	"bssid",
	"chan",
	"freq",
	"mode",
	"rsn-flags",
	"security",
	"signal",
	"ssid",
	"wpa-flags",
] as const;
