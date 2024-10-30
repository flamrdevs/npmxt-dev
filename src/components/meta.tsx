import { Meta, Title, useHead } from '@solidjs/meta';

import * as env from '~/env';

const TITLE = 'npmxt';
const DESCRIPTION = 'npmxt';

export namespace Base {
	export type Props = { title?: string; description?: string };
}

export const Base = (props: Base.Props) => {
	const title = createMemo(() => `${props.title || TITLE}`);
	const description = createMemo(() => `${props.description || DESCRIPTION}`);

	return (
		<>
			<Title>{title()}</Title>
			<Meta name="description" content={description()} />
		</>
	);
};

export namespace OG {
	export type Props = {
		title?: string;
		description?: string;
		img?: string;
	};
}

export const OG = (() => {
	const use = (property: string, content: string) => {
		useHead({
			tag: 'meta',
			props: { property, content },
			id: createUniqueId(),
			get name() {
				return property;
			},
		});
	};

	return (props: OG.Props) => {
		const location = useLocation();

		const title = createMemo(() => `${props.title || TITLE}`);
		const description = createMemo(() => `${props.description || DESCRIPTION}`);
		const url = createMemo(() => `${env.HOST}/${location.pathname}`);
		const image = createMemo(() => `${env.HOST}/og/${props.img || 'main'}`);

		use('og:type', 'website');
		use('og:url', url());
		use('og:title', title());
		use('og:description', description());
		use('og:image', image());

		use('twitter:card', 'summary_large_image');
		use('twitter:url', url());
		use('twitter:title', title());
		use('twitter:description', description());
		use('twitter:image', image());

		return null;
	};
})();
