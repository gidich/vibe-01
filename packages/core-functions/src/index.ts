import type { TimeProvider } from "@app/interfaces";
import { SystemTimeProvider } from "@app/time-impl";
import type { HttpRequest, HttpResponseInit } from "@azure/functions";

export interface TimeResponse {
	serverTime: string;
	message: "ok";
}

interface LegacyContext {
	res?: HttpResponseInit;
}

export function buildPayload(timeProvider: TimeProvider): TimeResponse {
	return {
		serverTime: timeProvider.getServerTime(),
		message: "ok",
	};
}

export async function httpTrigger(
	context: LegacyContext,
	_request: HttpRequest,
): Promise<HttpResponseInit> {
	const payload = buildPayload(new SystemTimeProvider());

	context.res = {
		status: 200,
		jsonBody: payload,
		body: JSON.stringify(payload),
		headers: {
			"content-type": "application/json",
		},
	};

	return context.res;
}
