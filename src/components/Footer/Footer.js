import React from 'react';
import { Link } from 'react-router-dom';

// components
import Menu from '../common/Menu';

import './Footer.scss';

//
function Footer({ logo, title: { rendered: siteTitle }, footerMenu }) {
	return (
		<footer className="site-footer">
			<div className="site-footer__copyright">
				&copy; {new Date().getFullYear()} {siteTitle}
			</div>
		</footer>
	);
}

//
export default Footer;
