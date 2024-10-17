import type { JSX } from "solid-js";
import type { Accessor, Component, ParentComponent, ParentProps, ValidComponent } from "solid-js";

import type { ClassValue } from "clsx";

declare global {
  namespace CLSX {
    export type { ClassValue };

    export type ClassValueProps = {
      class?: ClassValue;
    };

    export type ClassListValueProps = {
      classList?: ClassValue;
    };

    export type ClassesValueProps = ClassValueProps & ClassListValueProps;

    export type ClasssValueProps<T extends string> = {
      classs?: {
        [K in T]?: ClassValue;
      };
    };
  }

  namespace Solid {
    export type { JSX };
    export type { Accessor, Component, ParentComponent, ParentProps, ValidComponent };

    export type ClassProps = {
      class?: string;
    };

    export type ClassListProps = {
      classList?: Record<string, any>;
    };

    export type ClassesProps = ClassProps & ClassListProps;

    export type NeverChildrenProps<P> = Omit<P, "children"> & {
      children?: never;
    };
  }
}

export {};
