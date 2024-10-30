// @refresh reload
import { StartClient, mount } from '@solidjs/start/client';

const start = async () => {
	if (__ENABLE_MSW__) await (await import('~/mocks/client')).start();

	// biome-ignore lint/style/noNonNullAssertion: framework
	mount(() => <StartClient />, document.getElementById('app')!);
};

start();
