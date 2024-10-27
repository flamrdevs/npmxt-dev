import { mergeDefaultProps } from '@kobalte/utils';

import clsx from 'clsx';

export const createMergeDefaultProps =
	<P extends {}, As = P>(defaultProps: NoInfer<P>) =>
	(props: P) =>
		mergeDefaultProps<P, P>(defaultProps, props) as As;

export const classesSplitter = ['class', 'classList'] as const satisfies (keyof Solid.JSX.HTMLAttributes<any>)[];
export const classesx = (props: CLSX.ClassesValueProps, base?: CLSX.ClassValue) => clsx(base, props.class);

export type XVariantsPropsLike = Record<string, string | boolean | undefined>;
export const xvariants = <T extends XVariantsPropsLike>(variants: T) => {
	let result = '';
	let key: string;
	let value: string | boolean | undefined;
	for (key in variants) (value = variants[key]) && (result && (result += ' '), (result += `x-${key}${value === true ? '' : `-${value}`}`));
	return result;
};
export const createXVariantsProps = <P extends XVariantsPropsLike>(defaultProps: NoInfer<P>) =>
	[Object.keys(defaultProps) as (keyof P)[], createMergeDefaultProps<P>(defaultProps), xvariants as (variants: P) => string] as const;
