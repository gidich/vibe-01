import { promises as fs } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const repoRoot = dirname(root);
const deployDir = join(repoRoot, "deploy");

async function ensureCleanDir(path) {
	await fs.rm(path, { recursive: true, force: true });
	await fs.mkdir(path, { recursive: true });
}

async function copyFile(src, dest) {
	await fs.mkdir(dirname(dest), { recursive: true });
	await fs.copyFile(src, dest);
}

await ensureCleanDir(deployDir);

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
