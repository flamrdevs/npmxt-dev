import { Meta, Title, useHead } from '@solidjs/meta';
import { createMemo, createUniqueId } from 'solid-js';

import * as env from '~/env';

import { createMergeDefaultProps } from '~/utils';

const TITLE = 'npmxt';
const DESCRIPTION = 'npmxt';
const URL = '';
const IMAGE = 'main';

export namespace Base {
	export type Props = { title?: string; description?: string };
}

const mergeBaseDefaultProps = createMergeDefaultProps<Base.Props>({
	title: TITLE,
	description: DESCRIPTION,
});

export const Base = (props: Base.Props) => {
	props = mergeBaseDefaultProps(props);

	return (
		<>
			<Title>{props.title}</Title>
			<Meta name="description" content={props.description} />
		</>
	);
};

export namespace OG {
	export type Props = {
		url?: string;
		title?: string;
		description?: string;
		image?: string;
	};
}

const mergeOGDefaultProps = createMergeDefaultProps<OG.Props>({
	url: URL,
	title: TITLE,
	description: DESCRIPTION,
	image: IMAGE,
});

export const OG = (() => {
	const use = (property: string, content?: string) => {
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
		props = mergeOGDefaultProps(props);

		const url = createMemo(() => {
			const prop = props.url || URL;
			return `${env.HOST}${prop ? `/${prop}` : ''}`;
		});
		const image = createMemo(() => {
			const prop = props.image || IMAGE;
			return `${env.HOST}/og/${prop}`;
		});

		use('og:type', 'website');
		use('og:url', url());
		use('og:title', props.title);
		use('og:description', props.description);
		use('og:image', image());

		use('twitter:card', 'summary_large_image');
		use('twitter:url', url());
		use('twitter:title', props.title);
		use('twitter:description', props.description);
		use('twitter:image', image());

		return null;
	};
})();
