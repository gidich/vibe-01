import { promises as fs } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const repoRoot = dirname(root);
const deployDir = join(repoRoot, "deploy");

async function copyFile(src, dest) {
	await fs.mkdir(dirname(dest), { recursive: true });
	await fs.copyFile(src, dest);
}

await fs.mkdir(deployDir, { recursive: true });
await fs.rm(join(deployDir, "time"), { recursive: true, force: true });
await fs.rm(join(deployDir, "host.json"), { force: true });
await fs.rm(join(deployDir, "package.json"), { force: true });

await copyFile(
	join(repoRoot, "packages/core-functions/host.json"),
	join(deployDir, "host.json"),
);
await copyFile(
	join(repoRoot, "packages/core-functions/time/function.json"),
	join(deployDir, "time/function.json"),
);

const packageJson = {
	name: "azure-functions-v4-deploy",
	private: true,
	type: "module",
	engines: {
		node: ">=22 <23",
	},
};

await fs.writeFile(
	join(deployDir, "package.json"),
	`${JSON.stringify(packageJson, null, 2)}\n`,
);
