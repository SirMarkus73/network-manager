export type WifiFieldName = (typeof WIFI_FIELD_NAMES)[number];

export type ConnectionList<F extends readonly WifiFieldName[]> = Array<
	Record<F[number], string | boolean | null>
>;
