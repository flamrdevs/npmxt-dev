import { createAsync, query, useParams } from '@solidjs/router';
import { ErrorBoundary, Show, Suspense } from 'solid-js';

import { NPMPackageDownloadsChart } from '~/components/npm/charts/package-downloads';

import { RenderStatusMessageError } from '~/components/error';
import * as Meta from '~/components/meta';
import { Loader } from '~/components/ui';

import type { TPackageSchema } from '~/npm/schema';
import { fetchPackage } from '~/npm/utils';

const RenderPackage = (props: { pkg: TPackageSchema }) => {
	const title = () => `${props.pkg.name} - package`;
	const description = () => `${props.pkg.name} - package`;

	return (
		<>
			<Meta.Base title={title()} description={description()} />
			<Meta.OG title={title()} description={description()} img={`downloads/${props.pkg.name}`} />

			<div class="flex items-center justify-center w-dvw h-dvh bg-cn-1 font-bold text-4xl text-cn-12">
				<NPMPackageDownloadsChart pkg={props.pkg} />
			</div>
		</>
	);
};

const getPackage = query((name: string) => fetchPackage(name), 'package');

export const route = { preload: ({ params }: SolidJS.Router.RoutePreloadFuncArgs) => getPackage(params['name']) };

export default function PackageNamePage() {
	const params = useParams();

	const pkg = createAsync(() => getPackage(params['name']));

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
			<Suspense
				fallback={
					<div class="flex items-center justify-center min-h-80 bg-cn-1 text-cn-12">
						<Loader />
					</div>
				}
			>
				<Show when={pkg()}>{(pkg) => <RenderPackage pkg={pkg()} />}</Show>
			</Suspense>
		</ErrorBoundary>
	);
}
