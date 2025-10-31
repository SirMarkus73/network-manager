export type WifiRow = {
	active?: boolean;
	ssid?: string;
	bssid?: string;
	mode?: string;
	chan?: number;
	freq?: number;
	signal?: number;
	security?: string;
	"wpa-flags"?: string;
	"rsn-flags"?: string;
};

export type WifiFieldName = keyof WifiRow;
export type WifiFieldValue = WifiRow[keyof WifiRow];
