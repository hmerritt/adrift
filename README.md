# Adrift

Template react app with batteries included 🔋

- [Vite](https://vitejs.dev)
- [Vitest](https://vitest.dev/) (testing for Vite)
- [Playwright](https://playwright.dev) (testing end-to-end)
- [Typescript](https://www.typescriptlang.org)
- [TanStack Store](https://tanstack.com/store/latest)
- [TanStack Router](https://tanstack.com/router/latest)
- [StyleX](https://stylexjs.com/)
- [React Scan](https://github.com/aidenybai/react-scan) (local development)
- [Cosmos](https://github.com/react-cosmos/react-cosmos) (local development / lightweight `Storybook` alternative)
- Custom
    - [`bootstrap.ts`](./bootstrap.ts) - Build script
    - [`persist.ts`](./src/state/persist.ts) - Persister for [TanStack Store](https://tanstack.com/store/latest)
    - Components
        - [`Halo`](./src/view/components/experimental/Halo/index.tsx) - Animated halo/glow effect around a box
        - [`Noise`](./src/view/components/experimental/Noise/index.tsx) - Animated noise/grain effect (for images)
        - [`Ripple`](./src/view/components/experimental/Ripple/index.tsx) - Animated ripple effect on-click (inspired by material-ui)
        - [`Shader`](./src/view/components/experimental/Shader/index.tsx) - Renders a basic GLSL shader (just ~3kb gziped)
    - Utils and helper functions
        - [`log`](./src/lib/global/log.ts) - Log functions with timestamps, namespaces, and time-since-last-log prepended to each log
        - [`env`](./src/lib/global/env.ts) - Env object with type-safe environment variables
        - [`feature`](./src/lib/global/featureFlags.ts) - Feature flag function (uses `env`)

> Checkout [Adrift Native](https://github.com/hmerritt/adrift-native) to run Adrift apps natively on Windows, Mac, and Linux.

## Getting started

**_Quick start_**, get up an running in one command:

```bash
git clone https://github.com/hmerritt/adrift && cd adrift && bun i && bun dev
```

Clone this repo and run one of the following scripts:

Available scripts (run using `bun run <script>`):

- `dev` - starts Vite dev server for local development
- `test` - runs all test files
- `preview` - similar to `dev`, but uses production mode to simulate the final build
- `build` - builds the project to `dist` directory
- `cosmos` - [Cosmos](https://github.com/react-cosmos/react-cosmos) dev server
