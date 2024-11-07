import { createAsync, query, useParams } from '@solidjs/router';
import { ErrorBoundary, Show, Suspense } from 'solid-js';

import { NPMPackageDownloadChart } from '~/components/npm/charts/package-download';

import { RenderStatusMessageError } from '~/components/error';
import * as Meta from '~/components/meta';

import type { TPackageSchema } from '~/npm/schema';
import { fetchPackage } from '~/npm/utils';

const RenderPackage = (props: { pkg: TPackageSchema }) => {
	const title = () => `${props.pkg.name} - package`;
	const description = () => `${props.pkg.name} - package`;

	return (
		<>
			<Meta.Base title={title()} description={description()} />
			<Meta.OG title={title()} description={description()} img={`download/${props.pkg.name}`} />

			<div class="flex items-center justify-center w-dvw h-dvh bg-cn-1 font-bold text-4xl text-cn-12">
				<NPMPackageDownloadChart pkg={props.pkg} />
			</div>
		</>
	);
};

const getPackage = query((name: string) => fetchPackage(name), 'package-by-name');

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
			<Suspense fallback="Loading...">
				<Show when={pkg()}>{(pkg) => <RenderPackage pkg={pkg()} />}</Show>
			</Suspense>
		</ErrorBoundary>
	);
}
