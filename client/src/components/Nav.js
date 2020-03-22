import React from 'react';

export default function Nav() {
	return (
		<nav>
			<div class="nav-wrapper app black white-text">
				<ul class="right ">
					<li>
						<a class="waves-effect  black btn-flat   white-text text-lighten-3 waves-light btn">ADD</a>
					</li>
				</ul>
				<ul id="nav-mobile" class="left ">
					<li>
						<a class="waves-effect  black btn-flat   white-text text-lighten-3 waves-light btn">Cams</a>
					</li>
					<li>
						<a class="waves-effect  black btn-flat   white-text text-lighten-3 waves-light btn">
							Alert cams
						</a>
					</li>
					<li>
						<a class="waves-effect  black btn-flat   white-text text-lighten-3 waves-light btn">Faces</a>
					</li>
				</ul>
			</div>
		</nav>
	);
}
