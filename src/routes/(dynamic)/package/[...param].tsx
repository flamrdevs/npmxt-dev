import { cache } from '@solidjs/router';

import * as Meta from '~/components/meta';

import type { TPackageSchema } from '~/utils/npm/schema';
import { fetchPackageFromParam, transformPackageParam } from '~/utils/npm/utils';

const InvalidPackageName = (props: { param: string }) => {
	const param = createMemo(() => transformPackageParam(props.param));

	return (
		<>
			<Meta.Base title={`invalid - ${param().name}`} description={`invalid package name - ${param().name}`} />

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
			<Meta.OG title={title()} description={description()} img={`package/${pkg.name}`} />

			<div class="flex items-center justify-center w-dvw h-dvh bg-neutral-1 font-bold text-4xl text-neutral-12">
				<h1>
					{pkg.name}@{pkg.version}
				</h1>
			</div>
		</>
	);
};

const getPackage = cache((param: string) => fetchPackageFromParam(param), 'package-by-param');

export const route = { preload: ({ params }: SolidJS.Router.RoutePreloadFuncArgs) => getPackage(params['param']) };

export default function PackageNamePage() {
	const params = useParams();

	const pkg = createAsync(() => getPackage(params['param']));

	return (
		<>
			<Show when={pkg()} fallback={<InvalidPackageName param={params['param']} />} keyed>
				{validPackageName}
			</Show>
		</>
	);
}
