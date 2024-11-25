import fs from "node:fs/promises";
import path from "node:path";

await fs.rmdir(path.join(__dirname, "..", "dist"), {
  recursive: true,
});
