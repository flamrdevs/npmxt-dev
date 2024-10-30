import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';

import { MetaProvider } from '@solidjs/meta';

import { RenderStatusMessageError } from '~/components/error';
import * as Meta from '~/components/meta';
import { ColorMode } from '~/components/theme';

import '~/styles/app.css';

export default function App() {
	return (
		<Router
			root={(props) => (
				<MetaProvider>
					<Meta.Base />
					<ColorMode>
						<ErrorBoundary
							fallback={(error) => (
								<RenderStatusMessageError error={error}>
									{(message) => (
										<div class="flex items-center justify-center w-dvw h-dvh bg-neutral-1 font-medium text-lg text-neutral-12">
											<div>{message}</div>
										</div>
									)}
								</RenderStatusMessageError>
							)}
						>
							<Suspense>{props.children}</Suspense>
						</ErrorBoundary>
					</ColorMode>
				</MetaProvider>
			)}
		>
			<FileRoutes />
		</Router>
	);
}
