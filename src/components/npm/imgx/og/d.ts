import type { TPackageDownloadRangeSchema } from '~/utils/npm/schema';
import { og } from '~/utils/server/response/og';

export default (name: string, version: string, downloads: TPackageDownloadRangeSchema['downloads']) => {
	return og(
		(e) => [
			e('div', {
				style: {
					fontSize: '24px',
					fontWeight: 700,
				},
				children: `${name}@${version}`,
			}),
			e('div', {
				style: {
					fontSize: '10px',
					fontWeight: 500,
				},
				children: `${downloads.reduce((a, { downloads }) => a + downloads, 0)} downloads last year`,
			}),
		],
		{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: 'black',
			color: 'white',
			border: '1px solid black',
		},
	);
};
