import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import Nav from './components/Nav';
import Logs from './components/Logs/Logs';
import { path } from './constants/routes';

import { createFaceMatcher, createLabeledDescriptor } from './util/faceMatcher';
import image from './media/ivan.jpg';
import Terminal from 'components/Terminal/Terminal';
import Settings from 'components/Settings/Settings';
import Workers from 'components/Workers/Workers';
import AddWorker from 'components/AddWorker/AddWorker';

function App() {
	return (
		<div className="App">
			<Router>
				<Nav />
				<Switch>
					<Route path={path.login}>
						<div>Login</div>
					</Route>
					<Route path={path.terminal} exact>
						<Terminal />
					</Route>
					<Route path={path.logs}>
						<Logs />
					</Route>
					<Route path={path.settings}>
						<Settings />
					</Route>
					<Route path={path.workers}>
						<Workers />
					</Route>
					<Route path={path.addWorker}>
						<AddWorker />
					</Route>
				</Switch>
			</Router>
			<footer className="white-text center">"footer"</footer>
		</div>
	);
}

export default App;
