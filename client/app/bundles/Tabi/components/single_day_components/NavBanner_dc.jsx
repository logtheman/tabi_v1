import React from "react";
import { NavLink } from "react-router-dom";

const NavBanner = () => {
	// export default class NavBanner extends React.Component {

	return (
		<div className="navbar">
			<div className=" nav-links">
				<ul className="list-inline">
					<li className="list-inline-item pull-right fa-2x mr-3 pt-2">
						{" "}<NavLink to="#">
							<i className="fa fa-calendar" aria-hidden="true" />
						</NavLink>
					</li>
					<li className="list-inline-item pull-right fa-2x mr-3 pt-2">
						<NavLink to="/day_view">
							<i className="fa fa-th-large" aria-hidden="true" />
						</NavLink>
					</li>
					<li className="list-inline-item pull-right fa-2x mr-3 pt-2">
						<NavLink to="/single_day">
							<i className="fa fa-list" aria-hidden="true" />
						</NavLink>
					</li>
					<li className="list-inline-item title-header pt-1 ml-4">
						<strong><NavLink to="/home">Tabi</NavLink></strong>
					</li>
					<li className="list-inline-item lead ml-2 tagline">
						Get out of town
					</li>
				</ul>
			</div>
		</div>
	);
};

export default NavBanner;