import { createMemo, splitProps } from 'solid-js';

import * as K from '@kobalte/core/button';
import type { PolymorphicProps } from '@kobalte/core/polymorphic';

import { type VariantsOf, klass } from '@klass/core';

import { classesSplitter, classesToArray, klassXVariants } from '../../utils';

import './button.css';

type As = 'button';

export namespace Button {
	export type Variants = VariantsOf<typeof buttonVariants>;

	export type Props<T extends Solid.ValidComponent = As> = K.ButtonRootProps<T> & CLSX.ClassesValueProps & Variants;
}

export const defaultButtonVariantsProps = {
	color: 'n',
	size: 'md',
} as const;

export const buttonVariants = klass({
	base: 'xt-button',
	variants: klassXVariants({
		color: ['n', 'p'],
		size: ['sm', 'md', 'lg'],
	}),
	defaults: defaultButtonVariantsProps,
});

export const Button = <T extends Solid.ValidComponent = As>(props: PolymorphicProps<T, Button.Props<T>>) => {
	const [classes, variants, others] = splitProps(props as Button.Props, classesSplitter, buttonVariants.k);

	const $class = createMemo(() => buttonVariants(variants, classesToArray(classes)));

	return <K.Root<As> class={$class()} {...others} />;
};
