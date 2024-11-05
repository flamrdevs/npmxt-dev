import plugin from 'unplugin-auto-import/vite';

export default () =>
	plugin({
		imports: [
			{
				['clsx']: ['clsx'],
			},
		],
		include: [/\.tsx?$/],
		dts: './src/types/auto-imports.d.ts',
		biomelintrc: {
			enabled: true,
		},
	});
