export const splitter = ['class', 'classList'] as const satisfies (keyof Solid.JSX.HTMLAttributes<any>)[];

export const toArray = (props: CLSX.ClassesValueProps) => [props.class, props.classList];
