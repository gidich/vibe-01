import type { TimeProvider } from "@app/interfaces";

export class SystemTimeProvider implements TimeProvider {
	getServerTime(): string {
		return new Date().toISOString();
	}
}
