import { readFile } from "fs/promises";
import { settingsSchema } from "./schema";

export const settings = settingsSchema.parse(JSON.parse((await readFile("settings.json")).toString()));
