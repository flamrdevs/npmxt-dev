import * as Meta from '~/components/meta';

export default function NotFoundPage() {
	return (
		<>
			<HttpStatusCode code={404} />

			<Meta.Base title="Not Found" description="Page not found" />

			<div class="flex items-center justify-center w-dvw h-dvh bg-neutral-1 font-bold text-4xl text-neutral-12">
				<h1>NotFoundPage</h1>
			</div>
		</>
	);
}
