import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as Redux } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "state";

import "lib/styles/global/index.scss";

import { HaloProvider } from "view/components";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement as HTMLElement);

root.render(
	<StrictMode>
		<Redux store={store}>
			<Router>
				<HaloProvider>
					<App />
				</HaloProvider>
			</Router>
		</Redux>
	</StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// @ts-ignore: config param is optional
serviceWorkerRegistration.register();
