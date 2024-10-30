export default (record: Record<string, any>) => {
	console.log('');
	console.log('define');
	for (const key in record) console.log(`  ${key} : ${record[key]}`);
	console.log('');
	return record;
};
