import type { PolymorphicProps } from '@kobalte/core/polymorphic';
import * as K from '@kobalte/core/separator';

import { type VariantsOf, klass } from '@klass/core';

type As = 'hr';

export namespace Separator {
	export type Variants = VariantsOf<typeof separatorVariants>;

	export type Props<T extends Solid.ValidComponent = As> = K.SeparatorRootProps<T> & CLSX.ClassesValueProps & Variants;
}

export const defaultSeparatorVariantsProps = {
	color: 'neutral',
} as const;

export const separatorVariants = klass({
	base: 'xt-separator',
	variants: {
		color: {
			neutral: 'x-neutral',
			primary: 'x-primary',
		},
	},
	defaults: defaultSeparatorVariantsProps,
});

export const Separator = <T extends Solid.ValidComponent = As>(props: PolymorphicProps<T, Separator.Props<T>>) => {
	const [classes, variants, others] = splitProps(props as Separator.Props, classesSplitter, separatorVariants.k);

	const $class = createMemo(() => separatorVariants(variants, classesToArray(classes)));

	return <K.Root<As> class={$class()} {...others} />;
};
