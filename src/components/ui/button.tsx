import * as K from '@kobalte/core/button';
import type { PolymorphicProps } from '@kobalte/core/polymorphic';

import { type VariantsOf, klass } from '@klass/core';

type As = 'button';

export namespace Button {
	export type Variants = VariantsOf<typeof buttonVariants>;

	export type Props<T extends Solid.ValidComponent = As> = K.ButtonRootProps<T> & CLSX.ClassesValueProps & Variants;
}

export const defaultButtonVariantsProps = {
	color: 'neutral',
	size: 'md',
} as const;

export const buttonVariants = klass({
	base: 'xt-button',
	variants: {
		color: {
			neutral: 'x-neutral',
			primary: 'x-primary',
		},
		size: {
			sm: 'x-sm',
			md: 'x-md',
			lg: 'x-lg',
		},
	},
	defaults: defaultButtonVariantsProps,
});

export const Button = <T extends Solid.ValidComponent = As>(props: PolymorphicProps<T, Button.Props<T>>) => {
	const [classes, variants, others] = splitProps(props as Button.Props, classesSplitter, buttonVariants.k);

	const $class = createMemo(() => buttonVariants(variants, classesToArray(classes)));

	return <K.Root<As> class={$class()} {...others} />;
};
