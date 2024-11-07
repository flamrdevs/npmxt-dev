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
			dev: process.argv.includes('dev'),
			msw: process.argv.includes('--msw')
				? {
						delay: true,
					}
				: undefined,
		}),
		plugins: [autoImport()],
		build: {
			minify,
		},
	},
});
