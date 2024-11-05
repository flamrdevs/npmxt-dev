import indexeddb from 'fake-indexeddb';

import { server } from '~/mocks/node';

globalThis.indexedDB = indexeddb;

beforeAll(() => {
	server.listen();
});

afterEach(() => {
	server.resetHandlers();
});

afterAll(() => {
	server.close();
});
