import path from "node:path";

import { $ } from "bun";
import { GenX } from "@toil/typebox-genx";

$.cwd("./");
await $`rm -rf ./dist`;
await $`bun build:core`;
await $`mkdir ./dist/typebox`;

const root = path.resolve(__dirname, "..");
const genx = new GenX({
  root,
});

await genx.generateByDir(
  path.resolve(root, "src", "types"),
  path.resolve(root, "dist", "typebox"),
);
