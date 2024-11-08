## Features

- interactive chart
- dynamic opengraph
- badge & chart generator service

## Tech Stack

### Frameworks & Libraries

- SolidStart
- CSS & TailwindCSS (styling)
- Kobalte & Zag (headless components & hooks)
- Plot & D3 (chart)
- Drizzle (ORM)

### Services

- Netlify
- Turso
- NPM public API

### Tools

- Bun
- Vitest
- Mock Service Worker (MSW)
- Biome (1st) + Prettier (2nd)

## Links

- [solid-js](https://github.com/search?q=repo%3Aflamrdevs%2Fnpmxt-dev+%22from+%27solid-js%27%3B%22&type=code)
  - ErrorBoundary
  - For
  - Show
  - Suspense
  - createEffect
  - createMemo
  - createUniqueId
  - onCleanup
  - onMount
  - children
  - splitProps
- [solid-js/web](https://github.com/search?q=repo%3Aflamrdevs%2Fnpmxt-dev+%22from+%27solid-js%2Fweb%27%3B%22&type=code)
  - [Dynamic](./src/components/ui/utils.tsx)
  - [isServer](./src/npm/storage.ts)
- [@solidjs/meta](https://github.com/search?q=repo%3Aflamrdevs%2Fnpmxt-dev+%22from+%27%40solidjs%2Fmeta%27%3B%22&type=code)
  - [MetaProvider](./src/app.tsx)
  - [Meta](./src/components/meta.tsx)
  - [Title](./src/components/meta.tsx)
  - [useHead](./src/components/meta.tsx)
- [@solidjs/router](https://github.com/search?q=repo%3Aflamrdevs%2Fnpmxt-dev+%22from+%27%40solidjs%2Frouter%27%3B%22&type=code)
  - [action](./src/auth/actions.ts)
  - [createAsync](./src/components/npm/charts/package-downloads/package-downloads.tsx)
  - [query](./src/components/npm/charts/package-downloads/package-downloads.tsx)
  - [redirect](./src/auth/actions.ts)
  - [json](<./src/routes/(api)/api/package-creation/[...name].ts>)
  - [preload](<./src/routes/(auth)/dash.tsx>)
  - [useLocation](./src/components/meta.tsx)
  - [useParams](<./src/routes/(dynamic)/package/[...input].tsx>)
- [@solidjs/start](https://github.com/search?q=repo%3Aflamrdevs%2Fnpmxt-dev+%22from+%27%40solidjs%2Fstart%27%3B%22&type=code)
  - [defineConfig](./app.config.ts)
  - [FileRoutes](./src/app.tsx)
  - [clientOnly](./src/components/npm/charts/package-downloads/index.ts)
  - [mount](./src/entry-client.tsx)
  - [StartClient](./src/entry-client.tsx)
  - ['use server'](./src/auth/session.ts)
  - [GET](./src/npm/utils.get.ts)
  - HttpHeader
  - [HttpStatusCode](./src/components/error.tsx)
  - [StartServer](./src/entry-server.tsx)
  - Other
    - [prerender](./app.config.ts)
    - [middleware](./src/middleware.ts)
    - [session](./src/auth/session.ts)
    - [auth](./src/auth/session.ts)
