export const WIFI_FIELD_NAMES = [
	"active",
	"ssid",
	"bssid",
	"mode",
	"chan",
	"freq",
	"signal",
	"security",
	"wpa-flags",
	"rsn-flags",
] as const;

export type WifiFieldName = (typeof WIFI_FIELD_NAMES)[number];

export type ConnectionList<F extends readonly WifiFieldName[]> = Array<
	Record<F[number], string | boolean | null>
>;
