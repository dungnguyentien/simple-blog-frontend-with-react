import React from 'react';
import { Link } from 'react-router-dom';

// components
import NavMenu from './NavMenu';

//
function Header({ logo, siteTitle, primaryMenu }) {
	return (
		<div className="wrapper-header">
			<div className="container">
				<header className="site-header">
					<nav className="navbar navbar-expand-lg">
						<Link to="/" className="navbar-brand">
							<img src={logo} alt={siteTitle} title={siteTitle} />
						</Link>
						<button className="navbar-toggler" type="button">
							<span className="navbar-toggler__line"></span>
							<span className="navbar-toggler__line"></span>
							<span className="navbar-toggler__line"></span>
						</button>
						<div className="collapse navbar-collapse">
							<NavMenu className="navbar-nav ml-auto" items={primaryMenu} />
						</div>
					</nav>
				</header>
			</div>
		</div>
	);
}

//
export default Header;
