import { defineConfig } from '@solidjs/start/config';

import autoImport from './auto-import';

import define from './define';

const minify = false;

export default defineConfig({
	server: {
		// preset: 'netlify',
		prerender: {
			routes: ['/', '/about', '/ui'],
		},
		minify,
		sourceMap: false,
	},
	vite: {
		define: define({
			__DEV__: process.argv.includes('dev'),
			__ENABLE_MSW__: process.argv.includes('--msw'),
		}),
		plugins: [autoImport()],
		build: {
			minify,
			rollupOptions: {
				output: {
					manualChunks(id) {
						if (id.includes('node_modules/valibot')) return 'valibot';
					},
				},
			},
		},
	},
});
