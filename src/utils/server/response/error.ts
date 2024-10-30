import { errorStatusMessage } from '~/utils/error';

export const errorStatusMessageResponse = (error: unknown) => {
	const { status, message } = errorStatusMessage(error);
	return json({ message }, { status });
};
