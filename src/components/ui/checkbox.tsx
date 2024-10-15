import { splitProps } from "solid-js";

import * as K from "@kobalte/core/checkbox";

import { CheckIcon } from "lucide-solid";

import { classesSplitter, classesx } from "~/utils";
import { inlineFormControlSplitter, ShowInlineFormControlLayout, type InlineFormControlProps } from "./utils";

export namespace Checkbox {
  export type Props = Pick<K.CheckboxRootProps<"div">, "checked" | "onChange" | "readOnly" | "disabled"> &
    InlineFormControlProps &
    CLSX.ClassesValueProps &
    Pick<ShowInlineFormControlLayout.Props, "labelPosition">;
}

export const Checkbox = (props: Checkbox.Props) => {
  let [inlineFormControl, classes, others] = splitProps(props as Checkbox.Props, inlineFormControlSplitter, classesSplitter);

  const scope = "xt-checkbox";

  return (
    <K.Root class={classesx(classes, [ShowInlineFormControlLayout.scope, scope])} {...others}>
      <ShowInlineFormControlLayout {...inlineFormControl} Label={K.Label} defaultLabelPosition="right">
        <K.Input class={`${scope}-input`} />
        <K.Control class={`${scope}-control`}>
          <K.Indicator class={`${scope}-indicator`}>
            <CheckIcon />
          </K.Indicator>
        </K.Control>
      </ShowInlineFormControlLayout>
    </K.Root>
  );
};
