import __ENV__ from './__ENV__';

export default (
	record: {
		[key in '__DEV__' | '__ENABLE_MSW__']: any;
	} & {
		[key: string]: any;
	},
) => {
	console.log('');
	console.log('define');
	let key: string;
	for (key in record) console.log(`  ${key} : ${record[key]}`);
	for (key in __ENV__) record[`__ENV__.${key}`] = `"${__ENV__[key]}"`;
	console.log('');

	return record;
};
