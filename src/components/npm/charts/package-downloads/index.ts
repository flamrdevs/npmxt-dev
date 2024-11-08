import { clientOnly } from '@solidjs/start';

export const NPMPackageDownloadsChart = clientOnly(() => import('./package-downloads'), { lazy: true });
