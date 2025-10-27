import { exec } from "@/lib/exec.js";
import type { WifiFieldName } from "@/types/wifi.js";

export async function getWifiStatus(
	fieldNames: readonly WifiFieldName[],
): Promise<
	Partial<Record<WifiFieldName, string | boolean | null>> | undefined
> {
	const { stdout } = await exec(
		`LANG=C nmcli -t -f ${fieldNames.join(",")} device wifi list --rescan no`,
	);

	const lines = stdout
		.trim()
		.split("\n")
		.map((line) => {
			const splitFields = line
				.replace(/\\:/g, ";")
				.split(":")
				.map((field) => field.replace(/;/g, ":"));

			const parsedFields: Partial<
				Record<WifiFieldName, string | boolean | null>
			> = Object.fromEntries(
				fieldNames.map((fieldName, i) => {
					const fieldValue = splitFields[i];

					if (fieldValue === "yes" || fieldValue === "no") {
						return [fieldName, fieldValue === "yes"];
					}

					if (!fieldValue || fieldValue === "(none)") {
						return [fieldName, null];
					}

					return [fieldName, fieldValue];
				}),
			);

			return parsedFields;
		});

	const status = lines.filter((record) => record.active === true)[0];

	return status;
}
