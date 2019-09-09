// page components
import Home from '../pages/index';
import Page404 from '../pages/404';
import SinglePost from '../pages/blog/_slug';
import PageCategory from '../pages/category/_slug';

// @TODO: load routes based on /src/pages
export default [
	// home
	{ path: ['/', '/page/:page'], exact: true, component: Home },
	// { path: '/page/:page', exact: true, component: Home },
	// blog
	{ path: '/blog/:slug', exact: true, component: SinglePost },
	// category
	{ path: ['/category/:slug', '/category/:slug/page/:page'], exact: true, component: PageCategory },
	// 404
	{ path: '*', component: Page404 },
];
