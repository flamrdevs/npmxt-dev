import { FetchError } from 'ofetch';
import * as v from 'valibot';

import { getErrorMessage as getValibotErrorMessage } from '~/utils/valibot';

export class StatusError extends Error {
	constructor(
		message: string,
		public status = 200
	) {
		super(message);
	}
}

export const errorStatusMessage = (error: unknown) => {
	if (__DEV__) console.error(error);

	let message: string | undefined;
	let status: number | undefined;
	if (v.isValiError(error)) {
		message = getValibotErrorMessage(error);
		status = 400;
	} else if (error instanceof FetchError || error instanceof StatusError) {
		message = error.message;
		status = error.status;
	} else if (error instanceof Error) {
		message = error.message;
	}
	return { status: status ?? 500, message: message ?? 'Error' };
};
