import { createMemo, splitProps } from "solid-js";

import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import * as K from "@kobalte/core/button";

import { classesSplitter, classesx, createXVariantsProps } from "~/utils";

import { defaultButtonVariantsProps, type Button } from "./button";

type As = "button";

export namespace IconButton {
  export type Variants = Button.Variants;

  export type Props<T extends Solid.ValidComponent = As> = K.ButtonRootProps<T> & CLSX.ClassesValueProps & Variants;
}

export const defaultIconButtonVariantsProps: IconButton.Variants = {
  ...defaultButtonVariantsProps,
};

const [variantsSplitter, mergeDefaultVariantsProps, xvariants] = createXVariantsProps<IconButton.Variants>(defaultIconButtonVariantsProps);

export const IconButton = <T extends Solid.ValidComponent = As>(props: PolymorphicProps<T, IconButton.Props<T>>) => {
  let [classes, variants, others] = splitProps(props as IconButton.Props, classesSplitter, variantsSplitter);
  variants = mergeDefaultVariantsProps(variants);

  const $class = createMemo(() => classesx(classes, ["xt-icon-button", xvariants(variants)]));

  return <K.Root<As> class={$class()} {...others} />;
};
