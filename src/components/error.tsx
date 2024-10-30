import { errorStatusMessage } from '~/utils/error';

export const RenderStatusMessageError = (props: {
	error: any;
	children?: (message: string) => Solid.JSX.Element;
}) => {
	const { status, message } = errorStatusMessage(props.error);

	return (
		<>
			<HttpStatusCode code={status} />
			{props.children?.(message)}
		</>
	);
};
