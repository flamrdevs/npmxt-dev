import { createAsync, query, useParams } from '@solidjs/router';
import { ErrorBoundary, Show, Suspense } from 'solid-js';

import { RenderStatusMessageError } from '~/components/error';
import * as Meta from '~/components/meta';

import type { TPackageSchema } from '~/utils/npm/schema';
import { fetchPackageAlt } from '~/utils/npm/utils';

const RenderPackage = (props: { pkg: TPackageSchema }) => {
	const title = () => `${props.pkg.name} - package`;
	const description = () => `${props.pkg.name} - package`;

	return (
		<>
			<Meta.Base title={title()} description={description()} />
			<Meta.OG title={title()} description={description()} img={`package/${props.pkg.name}`} />

			<div class="flex items-center justify-center w-dvw h-dvh bg-cn-1 font-bold text-4xl text-cn-12">
				<h1>
					{props.pkg.name}@{props.pkg.version}
				</h1>
			</div>
		</>
	);
};

const getPackage = query((input: string) => fetchPackageAlt(input), 'package-alt');

export const route = { preload: ({ params }: SolidJS.Router.RoutePreloadFuncArgs) => getPackage(params['input']) };

export default function PackageNamePage() {
	const params = useParams();

	const pkg = createAsync(() => getPackage(params['input']));

	return (
		<ErrorBoundary
			fallback={(error) => (
				<RenderStatusMessageError error={error}>
					{(message) => (
						<div class="flex items-center justify-center w-dvw h-dvh bg-cn-1 font-medium text-lg text-cn-12">
							<div>{message}</div>
						</div>
					)}
				</RenderStatusMessageError>
			)}
		>
			<Suspense fallback="Loading...">
				<Show when={pkg()}>{(pkg) => <RenderPackage pkg={pkg()} />}</Show>
			</Suspense>
		</ErrorBoundary>
	);
}
