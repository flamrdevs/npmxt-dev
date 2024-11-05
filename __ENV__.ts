import * as dotenv from 'dotenv';

const __ENV__ = {} as {
	[key in keyof typeof global.__ENV__]: string;
} & {
	[key: string]: string;
};

const config = dotenv.config();

if (config.error) console.log(config.error);

// biome-ignore lint/style/noNonNullAssertion: should defined
dotenv.populate(__ENV__, config.parsed!);

export default __ENV__;
