import { server } from './node';

let listened = false;
export const listen = () => {
	if (!listened) {
		listened = true;
		server.listen();
	}
};
