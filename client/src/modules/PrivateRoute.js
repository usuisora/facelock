import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { postData } from './api';
export const fakeAuth = {
	isAuthenticated: false,
	authenticate({ login, password }, cb, errCb) {
		postData('http://localhost:5000/login', { login, password })
			.then((response) => {
				this.isAuthenticated = response.isAuthenticated;
				console.log(response.isAuthenticated);
				setTimeout(cb, 100);
			})
			.catch(errCb);
	},
	async signout(cb) {
		await postData('http://localhost:5000/signout', {});
		this.isAuthenticated = false;
		setTimeout(cb, 100);
	}
};
export const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			fakeAuth.isAuthenticated === true ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: '/sign-in',
						state: { from: props.location }
					}}
				/>
			)}
	/>
);
