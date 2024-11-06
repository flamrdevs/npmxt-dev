import { createMiddleware } from '@solidjs/start/middleware';

import { csrfProtection, secureRequest } from 'shieldwall/start';

import * as CSP from 'csp-header';

import * as NPM from './utils/npm/url';
import { CDN_JSDELIVR } from './utils/url';

export default createMiddleware({
	onRequest: [
		csrfProtection,

		secureRequest({
			crossOriginResourcePolicy: 'same-origin',
			csp: (() => {
				const withNonce = false;

				// prod
				const DEFAULT_SRC = [CSP.SELF, CSP.UNSAFE_INLINE];
				const FRAME_SRC = [CSP.SELF];
				const SCRIPT_SRC = [CSP.SELF];
				const SCRIPT_SRC_ELEM = [CSP.SELF, CSP.UNSAFE_INLINE];
				const FONT_SRC = [CSP.SELF, CDN_JSDELIVR];
				const STYLE_SRC = [CSP.SELF, CSP.UNSAFE_INLINE];
				const STYLE_SRC_ELEM = [CSP.NONE];
				const CONNECT_SRC = [CSP.SELF, NPM.BASE_URL_REGISTRY, NPM.BASE_URL_API];
				const IMG_SRC = [CSP.SELF, CSP.DATA];

				return {
					prod: {
						withNonce,
						value: {
							'default-src': DEFAULT_SRC,
							'frame-src': FRAME_SRC,
							'script-src': SCRIPT_SRC,
							'script-src-elem': SCRIPT_SRC_ELEM,
							'font-src': FONT_SRC,
							'style-src': STYLE_SRC,
							'style-src-elem': STYLE_SRC_ELEM,
							'connect-src': CONNECT_SRC,
							'img-src': IMG_SRC,
							'object-src': [],
						},
						cspReportOnly: true,
						cspBlock: false,
					},
					dev: {
						withNonce,
						value: {
							'default-src': DEFAULT_SRC,
							'frame-src': FRAME_SRC,
							'script-src': [...SCRIPT_SRC, CSP.UNSAFE_EVAL, CSP.UNSAFE_INLINE],
							'script-src-elem': [...SCRIPT_SRC_ELEM, CSP.UNSAFE_EVAL],
							'font-src': FONT_SRC,
							'style-src': STYLE_SRC,
							'style-src-elem': STYLE_SRC_ELEM,
							'connect-src': [...CONNECT_SRC, 'ws://localhost:*'],
							'img-src': IMG_SRC,
							'object-src': [CSP.NONE],
						},
						cspReportOnly: false,
						cspBlock: true,
					},
				};
			})(),
		}),
	],
});
