import { useParams } from "@solidjs/router";

import { Meta } from "~/components";

export default function PackageNamePage() {
  const params = useParams<{
    name?: string;
  }>();

  const name = () => params.name ?? "No name";

  return (
    <>
      <Meta.Base title={name()} description={name()} />

      <div class="flex items-center justify-center w-dvw h-dvh bg-neutral-1 font-bold text-4xl text-neutral-12">
        <h1>Package[{name()}]Page</h1>
      </div>
    </>
  );
}
