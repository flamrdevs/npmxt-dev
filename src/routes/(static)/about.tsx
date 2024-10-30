import * as Meta from '~/components/meta';

export default function AboutPage() {
	return (
		<>
			<Meta.Base title="About" description="About npmxt" />
			<Meta.OG title="About" description="About npmxt" img="about" />

			<div class="flex items-center justify-center w-dvw h-dvh bg-neutral-1 font-bold text-4xl text-neutral-12">
				<h1>AboutPage</h1>
			</div>
		</>
	);
}
