import path from 'node:path';

import { defineConfig } from 'vitest/config';

import solid from 'vite-plugin-solid';

import autoImport from './auto-import';

import define from './define';

export default defineConfig({
	plugins: [autoImport(), solid()],
	define: define({
		__DEV__: true,
		__ENABLE_MSW__: true,
	}),
	test: {
		environment: 'jsdom',
		include: ['test/**/*.test.ts?(x)'],
		setupFiles: ['./vitest.setup.ts'],
	},
	resolve: {
		alias: {
			'~': path.resolve(__dirname, 'src'),
		},
		conditions: ['development', 'browser'],
	},
});
