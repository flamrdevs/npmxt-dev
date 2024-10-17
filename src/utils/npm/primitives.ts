import { createMemo } from "solid-js";
import { isServer } from "solid-js/web";

import { useParams } from "@solidjs/router";

import { parsePackageName, type PackageNameObjectSchema } from "./core";

export const usePackageNameParams = () => {
  type Params = Partial<PackageNameObjectSchema>;

  const params = useParams<Params>();

  const raw: Solid.Accessor<Params["name"]> = () => params.name;

  const name = createMemo(() => {
    try {
      return parsePackageName(params.name);
    } catch (error) {
      if (import.meta.env.DEV) {
        if (!isServer) {
          console.error(error);
        }
      }
    }
  });

  return [name, raw] as const;
};
