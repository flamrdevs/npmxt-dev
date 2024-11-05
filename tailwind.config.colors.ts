import tailwindcssPlugin from 'tailwindcss/plugin';

const COLORS = {
	gray: [
		['0 0% 99%', '0 0% 98%', '0 0% 94%', '0 0% 91%', '0 0% 88%', '0 0% 85%', '0 0% 81%', '0 0% 73%', '0 0% 55%', '0 0% 51%', '0 0% 39%', '0 0% 13%'],
		['0 0% 7%', '0 0% 10%', '0 0% 13%', '0 0% 16%', '0 0% 19%', '0 0% 23%', '0 0% 28%', '0 0% 38%', '0 0% 43%', '0 0% 48%', '0 0% 71%', '0 0% 93%'],
	],
	iris: [
		['240 100% 100%', '240 100% 99%', '236 88% 97%', '238 100% 95%', '237 100% 93%', '238 100% 90%', '238 82% 85%', '238 74% 77%', '240 60% 60%', '240 55% 56%', '242 50% 55%', '238 43% 27%'],
		['240 22% 10%', '244 25% 12%', '237 38% 20%', '236 45% 27%', '237 41% 32%', '239 36% 37%', '240 34% 44%', '241 36% 52%', '240 60% 60%', '242 64% 64%', '246 100% 83%', '242 94% 94%'],
	],
	red: [
		['0 100% 99%', '0 100% 98%', '357 90% 96%', '358 100% 93%', '359 100% 90%', '359 94% 87%', '359 77% 81%', '359 70% 74%', '358 75% 59%', '358 69% 55%', '358 65% 49%', '351 63% 24%'],
		['0 19% 8%', '355 25% 10%', '350 53% 15%', '348 68% 19%', '350 63% 23%', '352 53% 29%', '355 47% 37%', '358 45% 49%', '358 75% 59%', '360 79% 65%', '2 100% 79%', '350 100% 91%'],
	],
	green: [
		['140 60% 99%', '137 47% 97%', '139 47% 93%', '140 49% 89%', '142 44% 84%', '144 41% 77%', '146 40% 68%', '151 40% 54%', '151 55% 42%', '152 56% 39%', '154 60% 32%', '155 40% 16%'],
		['154 20% 7%', '153 20% 9%', '152 41% 13%', '154 55% 15%', '154 52% 19%', '153 46% 23%', '152 44% 28%', '151 45% 34%', '151 55% 42%', '151 55% 45%', '151 65% 54%', '144 70% 82%'],
	],
} as const satisfies Record<string, TF.ReadonlyTuple<TF.ReadonlyTuple<string, 12>, 2>>;

const SHADES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

const ALIAS = {
	n: 'gray',
	p: 'iris',
	e: 'red',
	s: 'green',
} satisfies Record<string, keyof typeof COLORS>;

export const theme = Object.keys(ALIAS).reduce(
	(record, alias) => {
		record[`c${alias}`] = SHADES.reduce(
			(record, shade) => {
				record[shade] = `hsl(var(--c-${alias}-${shade}))`;
				return record;
			},
			{} as Record<string, string>,
		);
		return record;
	},
	{
		transparent: 'transparent',
		current: 'currentColor',
		inherit: 'inherit',
		black: {
			DEFAULT: '#000',
			1: 'rgba(0, 0, 0, 0.05)',
			2: 'rgba(0, 0, 0, 0.1)',
			3: 'rgba(0, 0, 0, 0.15)',
			4: 'rgba(0, 0, 0, 0.2)',
			5: 'rgba(0, 0, 0, 0.3)',
			6: 'rgba(0, 0, 0, 0.4)',
			7: 'rgba(0, 0, 0, 0.5)',
			8: 'rgba(0, 0, 0, 0.6)',
			9: 'rgba(0, 0, 0, 0.7)',
			10: 'rgba(0, 0, 0, 0.8)',
			11: 'rgba(0, 0, 0, 0.9)',
			12: 'rgba(0, 0, 0, 0.95),}',
		},
		white: {
			DEFAULT: '#fff',
			1: 'rgba(255, 255, 255, 0.05)',
			2: 'rgba(255, 255, 255, 0.1)',
			3: 'rgba(255, 255, 255, 0.15)',
			4: 'rgba(255, 255, 255, 0.2)',
			5: 'rgba(255, 255, 255, 0.3)',
			6: 'rgba(255, 255, 255, 0.4)',
			7: 'rgba(255, 255, 255, 0.5)',
			8: 'rgba(255, 255, 255, 0.6)',
			9: 'rgba(255, 255, 255, 0.7)',
			10: 'rgba(255, 255, 255, 0.8)',
			11: 'rgba(255, 255, 255, 0.9)',
			12: 'rgba(255, 255, 255, 0.95)',
		},
	} as Record<string, string | Record<string, string>>,
);

export const plugin = () =>
	tailwindcssPlugin(({ addBase }) => {
		const light: Record<`--${string}`, string> = {};
		const dark: Record<`--${string}`, string> = {};
		for (const name in COLORS) {
			const [LIGHT, DARK] = COLORS[name as keyof typeof COLORS];

			SHADES.forEach((_, index) => {
				light[`--c-${name}-${index}`] = LIGHT[index];
				dark[`--c-${name}-${index}`] = DARK[index];
			});
		}

		const alias = Object.entries(ALIAS).reduce(
			(record, [alias, name]) => {
				for (const SHADE of SHADES) record[`--c-${alias}-${SHADE}`] = `var(--c-${name}-${SHADE})`;
				return record;
			},
			{} as Record<`--${string}`, string>,
		);

		addBase({
			[`:root, [data-kb-theme="light"]`]: light,
			[`[data-kb-theme="dark"]`]: dark,
			[':root']: alias,
		});
	});
