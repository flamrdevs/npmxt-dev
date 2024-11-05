import { defineConfig } from '@solidjs/start/config';

import autoImport from './auto-import';

import define from './define';

const minify = true;

export default defineConfig({
	server: {
		prerender: {
			routes: ['/', '/about', '/ui'],
		},
		minify,
	},
	middleware: './src/middleware.ts',
	vite: {
		define: define({
			__DEV__: process.argv.includes('dev'),
			__ENABLE_MSW__: process.argv.includes('--msw'),
		}),
		plugins: [autoImport()],
		build: {
			minify,
		},
	},
});
