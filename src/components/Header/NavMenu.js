import React from 'react';
import { NavLink } from 'react-router-dom';

function Menu({ className, items }) {
	return (
		<ul className={className}>
			{items.map(({ id, url, title, children }) => {
				// has children
				if (children) {
					return (
						<li key={id} className="nav-item dropdown">
							<a href="#" className="nav-link dropdown-toggle">
								{title}
							</a>
							<div className="dropdown-menu">
								{children.map(child => (
									<NavLink key={child.id} to={child.url} className="dropdown-item">
										{child.title}
									</NavLink>
								))}
							</div>
						</li>
					);
				}

				// no children
				return (
					<li key={id} className="nav-item">
						<NavLink to={url} activeClassName="active" className="nav-link">
							{title}
						</NavLink>
					</li>
				);
			})}
		</ul>
	);
}

//
export default Menu;
