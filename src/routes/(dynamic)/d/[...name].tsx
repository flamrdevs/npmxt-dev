import { cache } from '@solidjs/router';

import { RenderStatusMessageError } from '~/components/error';
import * as Meta from '~/components/meta';

import type { TPackageSchema } from '~/utils/npm/schema';
import { fetchPackage } from '~/utils/npm/utils';

const InvalidPackageName = (props: { name: string }) => {
	return (
		<>
			<Meta.Base title={`invalid - ${props.name}`} description={`invalid package name - ${props.name}`} />

			<div class="flex items-center justify-center w-dvw h-dvh bg-neutral-1 font-medium text-3xl text-error-12">
				<h2>Invalid package name</h2>
			</div>
		</>
	);
};

const validPackageName = (pkg: TPackageSchema) => {
	const title = () => `${pkg.name} - package`;
	const description = () => `${pkg.name} - package`;

	return (
		<>
			<Meta.Base title={title()} description={description()} />
			<Meta.OG title={title()} description={description()} img={`d/${pkg.name}`} />

			<div class="flex items-center justify-center w-dvw h-dvh bg-neutral-1 font-bold text-4xl text-neutral-12">
				<h1>
					{pkg.name}@{pkg.version}
				</h1>
			</div>
		</>
	);
};

const getPackage = cache((name: string) => fetchPackage(name), 'package-by-name');

export const route = { preload: ({ params }: SolidJS.Router.RoutePreloadFuncArgs) => getPackage(params['name']) };

export default function PackageNamePage() {
	const params = useParams();

	const pkg = createAsync(() => getPackage(params['name']));

	return (
		<ErrorBoundary
			fallback={(error) => (
				<RenderStatusMessageError error={error}>
					{(message) => (
						<div class="flex items-center justify-center w-dvw h-dvh bg-neutral-1 font-medium text-lg text-neutral-12">
							<div>{message}</div>
						</div>
					)}
				</RenderStatusMessageError>
			)}
		>
			<Show when={pkg()} fallback={<InvalidPackageName name={params['name']} />} keyed>
				{validPackageName}
			</Show>
		</ErrorBoundary>
	);
}
