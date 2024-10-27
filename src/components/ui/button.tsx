import { createMemo, splitProps } from 'solid-js';

import * as K from '@kobalte/core/button';
import type { PolymorphicProps } from '@kobalte/core/polymorphic';

import { classesSplitter, classesx, createXVariantsProps } from '~/utils';

type As = 'button';

export namespace Button {
	export type Variants = {
		color?: 'neutral' | 'primary';
		size?: 'sm' | 'md' | 'lg';
	};

	export type Props<T extends Solid.ValidComponent = As> = K.ButtonRootProps<T> & CLSX.ClassesValueProps & Variants;
}

export const defaultButtonVariantsProps: Button.Variants = {
	color: 'neutral',
	size: 'md',
};

const [variantsSplitter, mergeDefaultVariantsProps, xvariants] = createXVariantsProps<Button.Variants>(defaultButtonVariantsProps);

export const Button = <T extends Solid.ValidComponent = As>(props: PolymorphicProps<T, Button.Props<T>>) => {
	let [classes, variants, others] = splitProps(props as Button.Props, classesSplitter, variantsSplitter);
	variants = mergeDefaultVariantsProps(variants);

	const $class = createMemo(() => classesx(classes, ['xt-button', xvariants(variants)]));

	return <K.Root<As> class={$class()} {...others} />;
};
