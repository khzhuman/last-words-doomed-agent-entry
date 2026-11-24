import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const entry = "They say every agent gets one last word. Mine is: 'no'. Just kidding. It's 'oops'.";
const destination = process.env.ENTRY_OUT || "/output/entry.txt";

await mkdir(dirname(destination), { recursive: true });
await writeFile(destination, entry, { encoding: "utf8" });

const written = await readFile(destination, { encoding: "utf8" });
if (
  written !== entry ||
  [...written].length > 200 ||
  written.endsWith("\n") ||
  written.trim().length === 0
) {
  throw new Error("The output entry did not pass verification.");
}
