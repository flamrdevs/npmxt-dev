import { Meta } from "~/components";

export default function NotFoundPage() {
  return (
    <>
      <Meta.Base title="Not Found" description="Page not found" />

      <div class="flex items-center justify-center w-dvw h-dvh bg-neutral-1 font-bold text-4xl text-neutral-12">
        <h1>NotFoundPage</h1>
      </div>
    </>
  );
}
