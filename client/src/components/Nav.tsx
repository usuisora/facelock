import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import routes from '../constants/routes';
import { BUTTON_CLASS_NAME, SELECTED_BUTTON } from 'constants/styleConsts';

export default function Nav() {
	const location = useLocation();
	useEffect(() => {}, [ location ]);
	return (
		<nav>
			<div className="nav-wrapper app black white-text">
				<ul className="right ">
					{routes.map((route) => (
						<Link
							key={route.name}
							to={route.path}
							className={route.path !== location.pathname ? BUTTON_CLASS_NAME : SELECTED_BUTTON}
						>
							{route.name}
						</Link>
					))}
				</ul>
			</div>
		</nav>
	);
}
