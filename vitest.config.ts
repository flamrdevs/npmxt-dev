import { defineConfig } from 'vitest/config';

import tsconfigPaths from 'vite-tsconfig-paths';

import solid from 'vite-plugin-solid';

import autoImport from './auto-import';

import define from './define';

export default defineConfig({
	plugins: [tsconfigPaths(), autoImport(), solid()],
	define: define({
		__DEV__: true,
		__ENABLE_MSW__: true,
	}),
	test: {
		globals: true,
		environment: 'jsdom',
		include: ['src/**/*.test.ts?(x)'],
		setupFiles: ['./vitest.setup.ts'],
	},
	resolve: {
		conditions: ['development', 'browser'],
	},
});
