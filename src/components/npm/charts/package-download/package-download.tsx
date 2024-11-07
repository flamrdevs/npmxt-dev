import { ErrorBoundary, Show, Suspense, createEffect, createMemo, onCleanup, onMount } from 'solid-js';

import { createAsync, query } from '@solidjs/router';

import { createResizeObserver } from '@solid-primitives/resize-observer';

import * as Plot from '@observablehq/plot';

import type { TPackageSchema } from '~/npm/schema';
import type { PackageDownloadsRecord } from '~/npm/utils.get';

import { fontFamilySans, v_cn2, v_cn6, v_cn9, v_cp9 } from '~/styles/utils';
import { dayjs } from '~/utils/dayjs';
import { formatNumber, formatNumberCompact } from '~/utils/formatter';

import { fetchPackageAllDownloadsRecord } from './utils';

type TransformedPackageAllDownloads = {
	name: string;
	start: Date;
	end: Date;
	downloads: { x: Date; y: number }[];
};

const transformPackageDownloadRange = (pkg: PackageDownloadsRecord): TransformedPackageAllDownloads => {
	const record: Record<string, number> = {};

	let tempDate: string;

	for (const date in pkg.record) record[(tempDate = date.slice(0, -3))] = (record[tempDate] ?? 0) + pkg.record[date];

	const downloads: { x: Date; y: number }[] = [];

	for (tempDate in record) downloads.push({ x: new Date(tempDate), y: record[tempDate] });

	return { name: pkg.name, start: new Date(pkg.start), end: new Date(pkg.end), downloads };
};

const RenderChart = (props: { tpkg: TransformedPackageAllDownloads }) => {
	let containerRef: HTMLDivElement | undefined;

	const yAxisTickFormatter = (d: any) => formatNumberCompact(d);

	const titleTipFormatter = (d: any) => [dayjs(d.x).format('MMM-YYYY'), formatNumber(d.y)].join('\n\n');

	const x = 'x';
	const y = 'y';

	const marks = createMemo(() => {
		const data = props.tpkg.downloads;

		return [
			Plot.axisX({ anchor: 'bottom', labelAnchor: 'right', ticks: data.length > 60 ? '6 months' : data.length > 30 ? '3 months' : 'month' }),
			Plot.axisY({ anchor: 'left', labelAnchor: 'top', ticks: 10, tickFormat: yAxisTickFormatter }),
			Plot.gridY({ stroke: v_cn9, strokeDasharray: '1,2' }),
			Plot.lineY(data, { x, y, curve: 'catmull-rom', stroke: v_cp9 }),
			Plot.ruleX(data, Plot.pointerX({ x, py: y, stroke: v_cn9 })),
			Plot.ruleY([0], { stroke: v_cn9 }),
			Plot.dot(data, Plot.pointerX({ x, y, stroke: v_cn9 })),
			Plot.tip(data, Plot.pointerX({ x, y, title: titleTipFormatter, fill: v_cn2, stroke: v_cn6, fontSize: 12, textPadding: 10 })),
		];
	});

	const rerender = createMemo(() => () => {
		if (__DEV__) console.log('NPMPackageDownloadChart - RenderChart rerender');

		containerRef?.firstChild?.remove();
		containerRef?.append(
			Plot.plot({
				width: containerRef.clientWidth,
				height: containerRef.clientHeight,
				marks: marks(),
				label: null,
				style: {
					fontFamily: fontFamilySans,
				},
			}),
		);
	});

	onMount(() => {
		createEffect(() => {
			rerender()();
		});

		createResizeObserver(containerRef, (_, el) => {
			if (el === containerRef) rerender()();
		});
	});

	onCleanup(() => {
		containerRef?.firstChild?.remove();
	});

	return <div ref={containerRef} class="size-full select-none" />;
};

const getTransformedPackageAllDownloadsRecord = query(
	async (pkg: TPackageSchema) => transformPackageDownloadRange(await fetchPackageAllDownloadsRecord(pkg.name)),
	'transformed-package-downloads-record',
);

const Chart = (props: { pkg: TPackageSchema }) => {
	const tpkg = createAsync(() => getTransformedPackageAllDownloadsRecord(props.pkg));

	return (
		<ErrorBoundary
			fallback={
				<div class="relative flex items-center justify-center size-full">
					<div class="relative font-medium text-xl">Error while loading chart</div>
				</div>
			}
		>
			<Suspense
				fallback={
					<div class="relative flex items-center justify-center size-full">
						<div class="relative size-[90%] animate-pulse">
							<div class="absolute top-1/3 left-0 w-full h-px bg-cn-4 rounded" />
							<div class="absolute top-2/3 left-0 w-full h-px bg-cn-4 rounded" />

							<div class="absolute bottom-2 left-0 w-full h-0.5 bg-cn-6 rounded" />
							<div class="absolute top-0 left-2 w-0.5 h-full bg-cn-6 rounded" />

							<div class="absolute h-px bg-cp-9 rounded -rotate-[12deg]" style={{ top: '40%', left: '15%', width: '60%' }} />
							<div class="absolute h-px bg-cp-9 rounded -rotate-[15deg]" style={{ top: '70%', left: '65%', width: '30%' }} />
						</div>
					</div>
				}
			>
				<Show when={tpkg()}>{(tpkg) => <RenderChart tpkg={tpkg()} />}</Show>
			</Suspense>
		</ErrorBoundary>
	);
};

export default (props: { pkg: TPackageSchema }) => {
	return (
		<div class="relative flex flex-col w-full max-w-[60rem] px-5 py-4 md:px-8 md:py-6 2xl:px-10 2xl:py-8 bg-cn-2 border border-cn-6 rounded-3xl">
			<div class="shrink-0 flex gap-2">
				<div class="flex flex-col gap-2">
					<h1 class="font-bold text-3xl text-cn-12">{props.pkg.name}</h1>
					<Show when={props.pkg.description}>{(description) => <p class="font-normal text-lg text-cn-11">{description()}</p>}</Show>
				</div>
			</div>
			<div class="grow p-1 aspect-video">
				<Chart pkg={props.pkg} />
			</div>
		</div>
	);
};
