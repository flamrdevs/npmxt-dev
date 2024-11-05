import { createMemo } from 'solid-js';

import { HttpStatusCode } from '@solidjs/start';

import { errorStatusMessage } from '~/utils/error';

export const RenderStatusMessageError = (props: {
	error: any;
	children?: (message: string) => Solid.JSX.Element;
}) =>
	createMemo(() => {
		const { status, message } = errorStatusMessage(props.error);

		return (
			<>
				<HttpStatusCode code={status} />
				{props.children?.(message)}
			</>
		);
	}) as unknown as Solid.JSX.Element;
