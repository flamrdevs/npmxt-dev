import * as Meta from '~/components/meta';

export default function IndexPage() {
	return (
		<>
			<Meta.Base />
			<Meta.OG />

			<div class="flex items-center justify-center w-dvw h-dvh bg-cn-1 font-bold text-4xl text-cn-12">
				<h1>IndexPage</h1>
			</div>
		</>
	);
}
