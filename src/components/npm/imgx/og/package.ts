import { og } from '~/utils/server/response/og';

export default (name: string, version: string) => {
	return og(
		(e) => [
			e('div', {
				style: {
					fontSize: '24px',
					fontWeight: 700,
				},
				children: `${name}@${version}`,
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
