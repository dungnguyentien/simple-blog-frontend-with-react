import React from 'react';
import { Link } from 'react-router-dom';

// components
import Menu from '../common/Menu';

import './Footer.scss';

//
function Footer({ title: { rendered: siteTitle }, footer_menu: { items: footerMenu } }) {
	return (
		<footer className="site-footer">
			<div className="site-footer__menu">
				<Menu items={footerMenu} />
			</div>
			<div className="site-footer__copyright">
				&copy; {new Date().getFullYear()} {siteTitle}
			</div>
		</footer>
	);
}

//
export default Footer;
