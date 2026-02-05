import { describe, expect, it } from "vitest";
import { SystemTimeProvider } from "./index.js";

const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

describe("SystemTimeProvider", () => {
	it("returns an ISO timestamp", () => {
		const provider = new SystemTimeProvider();
		const value = provider.getServerTime();

		expect(value).toMatch(isoDateRegex);
		expect(Number.isNaN(Date.parse(value))).toBe(false);
	});
});
