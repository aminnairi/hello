import { readFile } from "fs/promises";
import { settingsSchema } from "./schema";

const buffer = await readFile("settings.json");
const text = buffer.toString();
const json = JSON.parse(text);
const validation = settingsSchema.safeParse(json);

if (!validation.success) {
  validation.error.issues.forEach(issue => {
    const consolidatedPath = issue.path.join(".").trim();
    const path = consolidatedPath.length === 0 ? "root" : consolidatedPath;

    console.error(`Error while parsing the settings.json at ${path}: ${issue.message} (${issue.code})`);
  });

  process.exit(1);
}

export const settings = validation.data;
