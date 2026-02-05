import type { TimeProvider } from "@app/interfaces";
import type { HttpRequest, HttpResponseInit } from "@azure/functions";
import { describe, expect, it } from "vitest";
import { buildPayload, httpTrigger } from "./index.js";

class FixedTimeProvider implements TimeProvider {
	constructor(private readonly fixed: string) {}

	getServerTime(): string {
		return this.fixed;
	}
}

describe("buildPayload", () => {
	it("returns the expected response payload", () => {
		const provider = new FixedTimeProvider("2026-02-05T12:00:00.000Z");

		expect(buildPayload(provider)).toEqual({
			serverTime: "2026-02-05T12:00:00.000Z",
			message: "ok",
		});
	});
});

describe("httpTrigger", () => {
	it("returns JSON response with server time", async () => {
		const context: { res?: HttpResponseInit } = {};
		const response = await httpTrigger(context, {} as HttpRequest);

		expect(response.status).toBe(200);
		const payload =
			typeof response.jsonBody === "object" && response.jsonBody !== null
				? response.jsonBody
				: JSON.parse(String(response.body));

		expect(payload).toMatchObject({
			message: "ok",
			serverTime: expect.any(String),
		});
	});
});
