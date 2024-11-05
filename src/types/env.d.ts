type Env = {
	readonly SESSION_PASSWORD: string;

	readonly DASH_USERNAME: string;
	readonly DASH_PASSWORD: string;

	readonly TURSO_DATABASE_URL: string;
	readonly TURSO_AUTH_TOKEN: string;
};

declare global {
	var __ENV__: Env;
}

export {};
