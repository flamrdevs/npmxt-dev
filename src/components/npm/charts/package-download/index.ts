import { clientOnly } from '@solidjs/start';

export const NPMPackageDownloadChart = clientOnly(() => import('./package-download'), { lazy: true });
