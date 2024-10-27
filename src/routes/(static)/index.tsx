import { Meta } from '~/components';

export default function IndexPage() {
	return (
		<>
			<Meta.Base />
			<Meta.OG />

			<div class="flex items-center justify-center w-dvw h-dvh bg-neutral-1 font-bold text-4xl text-neutral-12">
				<h1>IndexPage</h1>
			</div>
		</>
	);
}
