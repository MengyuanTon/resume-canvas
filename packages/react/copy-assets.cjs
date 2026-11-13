const { copyFileSync, cpSync } = require("node:fs");
const { join } = require("node:path");

const source = join(__dirname, "public");
const output = join(__dirname, "build");

for (const directory of ["research-template", "vendor"]) {
  cpSync(join(source, directory), join(output, directory), { recursive: true });
}

copyFileSync(join(source, "favicon.ico"), join(output, "favicon.ico"));
copyFileSync(join(__dirname, "../../LICENSE"), join(output, "LICENSE"));
