import React from 'react';
import { Link } from 'react-router-dom';

function Menu({ className, items }) {
	return (
		<ul className={className}>
			{items.map(({ id, slug: url, title, children }) => (
				<li key={id}>
					<Link to={url}>{title}</Link>
					{children && <Menu items={children} />}
				</li>
			))}
		</ul>
	);
}

//
export default Menu;
