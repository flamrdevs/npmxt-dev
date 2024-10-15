import { createMemo, splitProps } from "solid-js";

import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import * as K from "@kobalte/core/separator";

import { classesSplitter, classesx, createXVariantsProps } from "~/utils";

type As = "hr";

export namespace Separator {
  export type Variants = {
    color?: "neutral" | "primary";
  };

  export type Props<T extends Solid.ValidComponent = As> = K.SeparatorRootProps<T> & CLSX.ClassesValueProps & Variants;
}

export const defaultSeparatorVariantsProps: Separator.Variants = {
  color: "neutral",
};

const [variantsSplitter, mergeDefaultVariantsProps, xvariants] = createXVariantsProps<Separator.Variants>(defaultSeparatorVariantsProps);

export const Separator = <T extends Solid.ValidComponent = As>(props: PolymorphicProps<T, Separator.Props<T>>) => {
  let [classes, variants, others] = splitProps(props as Separator.Props, classesSplitter, variantsSplitter);
  variants = mergeDefaultVariantsProps(variants);

  const $class = createMemo(() => classesx(classes, ["xt-separator", xvariants(variants)]));

  return <K.Root<As> class={$class()} {...others} />;
};
