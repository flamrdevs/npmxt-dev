import { ofetch } from 'ofetch';

import { BASE_URL_API, BASE_URL_REGISTRY } from './url';

export const fetcherPackage = (name: string, version: string) => ofetch(`${BASE_URL_REGISTRY}/${name}/${version}`);
export const fetcherPackageDownloadRange = (period: string, name: string) => ofetch(`${BASE_URL_API}/downloads/range/${period}/${name}`);
