import { ColorModeProvider, ColorModeScript, type ConfigColorMode, type MaybeConfigColorMode } from '@kobalte/core/color-mode';

export const ColorMode = (props: Solid.ParentProps) => {
	const [searchParams] = useSearchParams<{
		theme?: ConfigColorMode;
	}>();

	const initialColorMode = createMemo<MaybeConfigColorMode>(() => {
		const theme = searchParams.theme;
		if (theme === 'light' || theme === 'dark') return theme;
	});

	return (
		<>
			<ColorModeScript initialColorMode={initialColorMode()} />
			<ColorModeProvider initialColorMode={initialColorMode()}>{props.children}</ColorModeProvider>
		</>
	);
};
