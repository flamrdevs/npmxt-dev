// @refresh reload
import { StartClient, mount } from '@solidjs/start/client';

// biome-ignore lint/style/noNonNullAssertion: framework
mount(() => <StartClient />, document.getElementById('app')!);
