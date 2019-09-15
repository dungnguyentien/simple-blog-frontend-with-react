import React from 'react';
import { Link } from 'react-router-dom';

// components
import NavMenu from './NavMenu';
import SearchBox from './SearchBox';

import './Header.scss';

//
function Header({ logo, title: { rendered: siteTitle }, description: siteDescription, primary_menu: { items: primaryMenu }, ...rest }) {
	// console.log(rest);
	return (
		<header className="site-header">
			<div className="site-header__logo">
				<Link to="/">{siteTitle}</Link>
				<p>{siteDescription}</p>
			</div>
			<NavMenu items={primaryMenu} />
			<SearchBox />
		</header>
	);
}

//
export default Header;
