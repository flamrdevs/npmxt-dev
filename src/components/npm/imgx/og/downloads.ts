import * as d3 from 'd3';

import { ArrowRight, Download } from 'lucide';

import type { TPackageDownloadsRangeSchema } from '~/npm/schema';
import { OGImageResponse, height, width } from '~/server/imgx/response/og';

import * as colors from '~/imgx/colors';

import { formatNumberCompact } from '~/utils/formatter';

import { LucideIcon } from '../icons/lucide';

import { chartDataLastYearDownloads } from '../utils/downloads';

export default (name: string, downloads: TPackageDownloadsRangeSchema['downloads']) => {
	const theme = 'dark';

	const neutral = colors.n[theme];
	const primary = colors.p[theme];

	const [chartData, totalDownloads] = chartDataLastYearDownloads(downloads, 28);

	const totalDownloadsFormatted = formatNumberCompact(totalDownloads);
	const isTotalDownloadsFormattedLengthGreaterThan4 = totalDownloadsFormatted.length > 4;

	return OGImageResponse(
		(e) => [
			(() => {
				const chartWidth = width - 500;
				const chartHeight = height - 380;

				const chartTop = 180;
				const chartRight = 100;

				const mx = 0;
				const my = 10;

				const x = d3.scaleLinear([0, chartData.length - 1], [mx, chartWidth - mx]);
				const y = d3.scaleLinear(d3.extent(chartData) as unknown as [number, number], [chartHeight - my, my]);
				const line = d3.line((_, i) => x(i), y).curve(d3.curveCatmullRom);

				const pathd = line(chartData);

				return [
					e('svg', {
						width: chartWidth,
						height: chartHeight,
						style: { position: 'absolute', top: chartTop, right: chartRight },
						children: [
							e('path', { fill: 'none', stroke: primary[9], strokeWidth: '2', d: pathd, style: { filter: 'blur(2px)' } }),
							e('path', { fill: 'none', stroke: primary[9], strokeWidth: '2', d: pathd }),
						],
					}),

					e('div', {
						style: {
							position: 'absolute',
							backgroundImage: `linear-gradient(to right, ${neutral[2]} 0%, ${neutral[4]} 55%)`,
							top: chartTop,
							left: 0,
							width: width,
							height: 1,
						},
					}),
					e('div', {
						style: {
							position: 'absolute',
							backgroundImage: `linear-gradient(to right, ${neutral[2]} 0%, ${neutral[4]} 55%)`,
							top: chartTop + chartHeight,
							left: 0,
							width: width,
							height: 1,
						},
					}),
					e('div', {
						style: {
							position: 'absolute',
							backgroundImage: `linear-gradient(to bottom, ${neutral[2]} 0%, ${neutral[4]} 55%)`,
							top: 0,
							right: chartRight,
							width: 1,
							height: height,
						},
					}),
					e('div', {
						style: {
							position: 'absolute',
							backgroundImage: `linear-gradient(to bottom, ${neutral[2]} 0%, ${neutral[4]} 55%)`,
							top: 0,
							right: chartRight + chartWidth,
							width: 1,
							height: height,
						},
					}),
				];
			})(),

			e('div', {
				style: {
					display: 'flex',
					position: 'absolute',
					top: 85,
					left: 90,
					width: width - 220,
					fontSize: 50,
					fontWeight: 600,
					textOverflow: 'ellipsis',
					whiteSpace: 'nowrap',
					overflow: 'hidden',
				},
				children: name,
			}),

			e('div', {
				style: {
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					justifyContent: 'space-between',
					gap: 2,
					position: 'absolute',
					top: 200,
					left: 110,
				},
				children: [
					e('div', {
						style: { display: 'flex', alignItems: 'center', gap: isTotalDownloadsFormattedLengthGreaterThan4 ? 12 : 16 },
						children: [
							LucideIcon({ i: Download, size: isTotalDownloadsFormattedLengthGreaterThan4 ? 38 : 44, color: neutral[12] }),
							e('div', {
								style: { color: neutral[11], fontSize: isTotalDownloadsFormattedLengthGreaterThan4 ? 55 : 60, fontWeight: 500 },
								children: totalDownloadsFormatted,
							}),
						],
					}),

					e('div', { style: { paddingLeft: 3, color: neutral[11], fontSize: 22, fontWeight: 400 }, children: 'last year' }),
				],
			}),

			e('div', { style: { position: 'absolute', bottom: 80, left: 115, color: neutral[10], fontSize: 38, fontWeight: 700 }, children: 'npmxt' }),

			e('div', {
				style: { display: 'flex', alignItems: 'center', gap: 20, position: 'absolute', bottom: 80, right: 165 },
				children: LucideIcon({ i: ArrowRight, size: 44, color: neutral[11] }),
			}),
		],
		{
			style: {
				display: 'flex',
				backgroundColor: neutral[2],
				color: neutral[12],
				border: `1px solid ${neutral[3]}`,
				overflow: 'hidden',
			},
		}
	);
};
