import { defineConfig } from "rolldown";

export default defineConfig({
	input: "packages/core-functions/dist/index.js",
	output: {
		dir: "deploy/dist",
		format: "esm",
		sourcemap: true,
	},
	platform: "node",
	external: [/^node:/],
});
