import { Meta, Title, useHead } from '@solidjs/meta';
import { useLocation } from '@solidjs/router';
import { createEffect, createMemo, createUniqueId } from 'solid-js';

import { height as og_height, width as og_width } from '~/server/imgx/response/og/config';

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

	const HOST = __DEV__ ? 'http://localhost:3000' : 'https://npmxt-dev.netlify.app';

	return (props: OG.Props) => {
		const location = useLocation();

		const title = createMemo(() => `${props.title || TITLE}`);
		const description = createMemo(() => `${props.description || DESCRIPTION}`);
		const url = createMemo(() => `${HOST}${location.pathname}`);
		const image = createMemo(() => `${HOST}/og/${props.img || 'main'}`);

		if (__DEV__) {
			createEffect(() => {
				console.log(`Meta.OG - url ${url()}`);
				console.log(`Meta.OG - image ${image()}`);
			});
		}

		use('og:type', 'website');
		use('og:url', url());
		use('og:title', title());
		use('og:description', description());
		use('og:image', image());

		use('og:image:type', 'image/png');
		use('og:image:width', `${og_width}`);
		use('og:image:height', `${og_height}`);

		use('twitter:card', 'summary_large_image');
		use('twitter:url', url());
		use('twitter:title', title());
		use('twitter:description', description());
		use('twitter:image', image());

		return null;
	};
})();
