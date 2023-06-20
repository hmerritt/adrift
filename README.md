# Adrift

Template react app with batteries included 🔋

-   [Vite](https://vitejs.dev)
-   [Vitest (testing for Vite)](https://vitest.dev/)
-   [Typescript](https://www.typescriptlang.org)
-   [Redux](https://redux.js.org)
-   [React-Router](https://reactrouter.com)
-   [Linaria (SASS-in-JS)](https://github.com/callstack/linaria)
-   Custom (hackable) build script
-   Custom utils and helper functions
    -   Global `log` functions with extra functionality than using `console.log`
    -   Global `feature` flag function

## Getting started

To get started simply clone the repository and run one of the following scripts:

Available scripts (run using `yarn <script>` or `npm run <script>`):

-   `dev` - starts Vite dev server for local development
-   `test` - runs all test files
-   `preview` - similar to `dev`, but uses production mode to simulate the final build
-   `build` - builds the project to `dist` directory

## Features

### Global `log`, and `debug` functions

Anywhere in the code you can call `log()`, or `debug()` (no imports needed).

```js
log("my first log");
```

`debug` namespaces each log so you can keep track of multiple things at once.

```js
debug("websocket", "Initiated websocket connection");
```

### Styling (SASS-in-JS via Linaria)

Adrift uses Linaria, a **Zero runtime** CSS in JS library.

A custom config is used to enable the use of **SASS-in-JS**.

SASS allows for theming to be imported and used directly with the Linaria styles.

```js
const card = css`
	${theme} // Import theme object - can now use all SCSS variables and mixins set in styles/theme.ts
	color: $red-500; // See styles/colors.tsx
	box-shadow: $shadow-1; // See styles/shadows.tsx

	// All valid SCSS syntax is valid here (this is just an example)
	@for $i from 1 through 20 {
		.stack.stack-#{$i} {
			& > * {
				margin-top: #{$i}rem;
			}
		}
	}
`;
```

> Other popular libraries such as `styled-components` can negatively impact app performance due to their use of a runtime.
>
> Styling runtimes are usually okay for small apps, but don't scale very well when there are lots of styles for the runtime to handle.
