import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import App from "./App";

import "styles/index.scss";

const appVersion = process.env.REACT_APP_VERSION || "~";
console.log(`App [Version ${appVersion}]`);

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<App />
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
