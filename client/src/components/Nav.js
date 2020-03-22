import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
	return (
		<nav>
			<div className="nav-wrapper app black white-text">
				<ul className="right ">
					<li>
						<Link
							to="/add"
							className="waves-effect  black btn-flat   white-text text-lighten-3 waves-light btn"
						>
							ADD
						</Link>
					</li>
				</ul>
				<ul id="nav-mobile" className="left ">
					<li>
						<Link
							to="/"
							className="waves-effect  black btn-flat   white-text text-lighten-3 waves-light btn"
						>
							Cams
						</Link>
					</li>
					<li>
						<Link
							to="/alert"
							className="waves-effect  black btn-flat   white-text text-lighten-3 waves-light btn"
						>
							Alert cams
						</Link>
					</li>
					<li>
						<Link
							to="/faces"
							className="waves-effect  black btn-flat   white-text text-lighten-3 waves-light btn"
						>
							Faces
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}
