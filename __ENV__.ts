import * as dotenv from 'dotenv';

const __ENV__ = {} as {
	[key in keyof typeof global.__ENV__]: string;
} & {
	[key: string]: string;
};

try {
	const config = dotenv.config();

	if (config.error) console.log(config.error);
	else {
		if (config.parsed) {
			dotenv.populate(__ENV__, config.parsed);
		}
	}
} catch (error) {
	try {
		const config = dotenv.config({ path: ['.env.example'] });

		if (config.error) console.log(config.error);
		else {
			if (config.parsed) {
				const fromProcess: Record<string, any> = {};
				for (const key in config.parsed) fromProcess[key] = process.env[key];
				dotenv.populate(__ENV__, fromProcess);
			}
		}
	} catch (error) {}
}

export default __ENV__;
