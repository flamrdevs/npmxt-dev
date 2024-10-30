import { worker } from './browser';

let started = false;
export const start = async () => {
	if (!started) {
		started = true;
		await worker.start();
	}
};
