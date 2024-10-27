import { Suspense } from 'solid-js';

import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';

import { MetaProvider } from '@solidjs/meta';

import { Meta } from '~/components';

import '~/styles/app.css';
import { ColorMode } from './components/theme';

export default function App() {
	return (
		<Router
			root={(props) => (
				<MetaProvider>
					<Meta.Base />
					<ColorMode>
						<Suspense>{props.children}</Suspense>
					</ColorMode>
				</MetaProvider>
			)}
		>
			<FileRoutes />
		</Router>
	);
}
