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
	console.log('');

	return record;
};
