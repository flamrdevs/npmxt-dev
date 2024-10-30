import plugin from 'unplugin-auto-import/vite';

export default () =>
	plugin({
		imports: [
			{
				clsx: ['clsx'],

				'solid-js': ['ErrorBoundary', 'For', 'Show', 'Suspense', 'createMemo', 'createSignal', 'createUniqueId', 'splitProps'],
				'@solidjs/router': ['createAsync', 'json', 'useLocation', 'useParams', 'useSearchParams'],
				'@solidjs/start': ['HttpStatusCode'],

				'~/utils/classes': [
					['splitter', 'classesSplitter'],
					['toArray', 'classesToArray'],
				],
			},
		],
		include: [/\.tsx?$/],
		dts: './src/types/auto-imports.d.ts',
		biomelintrc: {
			enabled: true,
		},
	});
