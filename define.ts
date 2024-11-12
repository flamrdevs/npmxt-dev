export default ({
	dev,
	test,
	msw,
}: {
	dev: boolean;
	test: boolean;
	msw?: {
		delay?: boolean;
	};
}) => {
	const record: Record<any, any> = {};

	record['__DEV__'] = dev;
	record['__TEST__'] = test;

	record['__MSW__'] = Boolean(msw);
	record['__MSW_DELAY__'] = Boolean(msw?.delay);

	console.log('');
	console.log('define');
	let key: string;
	for (key in record) console.log(`  ${key} : ${record[key]}`);
	console.log('');

	return record;
};
