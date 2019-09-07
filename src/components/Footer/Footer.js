import React from 'react';
import { Link } from 'react-router-dom';

// components
import Menu from '../common/Menu';

//
function Footer({ logo, siteTitle, footerMenu }) {
	return (
		<div className="wrapper-footer">
			<footer className="site-footer">
				<div className="footer-top">
					<div className="container">
						<div className="row">
							<div className="col-12 col-md-3">
								<Link to="/">
									<img src={logo} alt={siteTitle} title={siteTitle} />
								</Link>
							</div>
							<div className="col-12 col-md-9">
								<Menu items={footerMenu} />
							</div>
						</div>
					</div>
				</div>
				<div className="footer-bottom">
					<div className="container">&copy; All rights reserved.</div>
				</div>
			</footer>
		</div>
	);
}

//
export default Footer;
