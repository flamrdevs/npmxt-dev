import { type ColorMode, ColorModeContext, useColorMode } from '@kobalte/core/color-mode';
import { Polymorphic, type PolymorphicProps } from '@kobalte/core/polymorphic';

export namespace SubColorMode {
	export type Props = {
		is: ColorMode;
	};
}

const localSplitter = ['is'] as const satisfies (keyof SubColorMode.Props)[];

export const SubColorMode = <T extends Solid.ValidComponent = 'div'>(props: PolymorphicProps<T, SubColorMode.Props>) => {
	const [local, others] = splitProps(props as SubColorMode.Props, localSplitter);

	const { colorMode } = useColorMode();

	const [subColorMode, setSubColorMode] = createSignal<ColorMode>(local.is ?? colorMode());

	const value = createMemo(() => ({
		colorMode: subColorMode,
		setColorMode: setSubColorMode,
		toggleColorMode: () => setSubColorMode((v) => (v === 'dark' ? 'light' : 'dark')),
	}));

	return (
		<ColorModeContext.Provider value={value()}>
			<Polymorphic as="div" {...others} data-kb-theme={subColorMode()} />
		</ColorModeContext.Provider>
	);
};
