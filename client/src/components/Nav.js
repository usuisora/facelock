import React from 'react';

export default function Nav() {
	return (
		<nav>
			<div class="nav-wrapper black white-text">
				<a href="#" class="btn right">
					Add
				</a>
				<ul id="nav-mobile" class="left hide-on-med-and-down">
					<li>
						<a href="#">Sass</a>
					</li>
					<li>
						<a href="#">Components</a>
					</li>
					<li>
						<a href="#">JavaScript</a>
					</li>
				</ul>
			</div>
		</nav>
	);
}
