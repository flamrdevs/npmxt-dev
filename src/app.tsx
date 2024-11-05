import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { ErrorBoundary, Suspense } from 'solid-js';

import { MetaProvider } from '@solidjs/meta';

import { ColorModeProvider, ColorModeScript } from '@kobalte/core/color-mode';

import { RenderStatusMessageError } from '~/components/error';
import * as Meta from '~/components/meta';

import '~/styles/fonts.css';
import '~/styles/app.css';

export default function App() {
	return (
		<Router
			root={(props) => (
				<MetaProvider>
					<Meta.Base />
					<ColorModeScript />
					<ColorModeProvider>
						<ErrorBoundary
							fallback={(error) => (
								<RenderStatusMessageError error={error}>
									{(message) => (
										<div class="flex items-center justify-center w-dvw h-dvh bg-cn-1 font-medium text-lg text-cn-12">
											<div>{message}</div>
										</div>
									)}
								</RenderStatusMessageError>
							)}
						>
							<Suspense>{props.children}</Suspense>
						</ErrorBoundary>
					</ColorModeProvider>
				</MetaProvider>
			)}
		>
			<FileRoutes />
		</Router>
	);
}
