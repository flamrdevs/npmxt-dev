import { Show } from "solid-js";

import * as env from "~/env";

import { Meta } from "~/components";

import { usePackageNameParams } from "~/utils/npm/primitives";

const InvalidPackageName = (props: { raw?: string }) => {
  return (
    <>
      <Meta.Base title={`invalid - ${props.raw}`} description={`invalid package name - ${props.raw}`} />

      <div class="flex items-center justify-center w-dvw h-dvh bg-neutral-1 font-medium text-3xl text-error-12">
        <h2>Invalid package name</h2>
      </div>
    </>
  );
};

const validPackageName = (name: Solid.Accessor<string>) => {
  const title = () => `${name()} - package`;
  const description = () => `${name()} - package`;

  return (
    <>
      <Meta.Base title={title()} description={description()} />
      <Meta.OG url={`${env.HOST}/og/d/${name()}`} title={title()} description={description()} />

      <div class="flex items-center justify-center w-dvw h-dvh bg-neutral-1 font-bold text-4xl text-neutral-12">
        <h1>Package[{name()}]Page</h1>
      </div>
    </>
  );
};

export default function PackageNamePage() {
  const [name, raw] = usePackageNameParams();

  return (
    <>
      <Show when={name()} fallback={<InvalidPackageName raw={raw()} />}>
        {validPackageName}
      </Show>
    </>
  );
}
