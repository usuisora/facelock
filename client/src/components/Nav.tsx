import React from 'react';
import { Link } from 'react-router-dom';

import routes from '../constants/routes';

export default function Nav() {
	return (
		<nav>
			<div className="nav-wrapper app black white-text">
				<ul className="right ">
					{routes.map((route) => (
						<Link
							key={route.name}
							to={route.path}
							className="waves-effect  black btn-flat   white-text text-lighten-3 waves-light btn"
						>
							{route.name}
						</Link>
					))}
				</ul>
			</div>
		</nav>
	);
}
