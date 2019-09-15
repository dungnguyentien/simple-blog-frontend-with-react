import React from 'react';
import { NavLink } from 'react-router-dom';

function Menu({ className, items }) {
	return (
		<nav className="site-navigation">
			<ul>
				{items.map(({ id, slug: url, title, children }) => (
					<li key={id} className="site-navigation__item">
						<NavLink to={url} activeClassName="active">
							{title}
						</NavLink>

						{children && children.length > 0 && (
							<ul>
								{children.map(({ id: childId, slug: childUrl, title: childTitle }) => (
									<li key={childId}>
										<NavLink to={childUrl} activeClassName="active">
											{childTitle}
										</NavLink>
									</li>
								))}
							</ul>
						)}
					</li>
				))}
			</ul>
		</nav>
	);
}

//
export default Menu;
