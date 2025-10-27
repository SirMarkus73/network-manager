import type { WIFI_FIELD_NAMES } from "@/constants/wifi.js";

export type WifiFieldName = (typeof WIFI_FIELD_NAMES)[number];

export type ConnectionList<F extends readonly WifiFieldName[]> = Array<
	Record<F[number], string | boolean | null>
>;
