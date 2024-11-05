import { StatusError } from './error';

describe('StatusError', () => {
	it('works correctly', () => {
		const error = new StatusError('not found', 404);

		expect(error).toBeInstanceOf(StatusError);
		expect(error.message).toEqual('not found');
		expect(error.status).toEqual(404);
	});
});
