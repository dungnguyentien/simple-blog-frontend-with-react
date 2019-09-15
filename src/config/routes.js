// import Loadable from 'react-loadable';

// page components
import Home from '../pages/index';
import Page404 from '../pages/404';
import SinglePost from '../pages/blog/_slug';
import CategoryPage from '../pages/category/_slug';
import SearchPage from '../pages/search';
import PageComponent from '../pages/_slug';

// @TODO: load routes based on /src/pages
export default [
	// home
	{ path: ['/', '/page/:page'], exact: true, component: Home },
	// { path: '/page/:page', exact: true, component: Home },
	// blog
	{ path: '/blog/:slug', exact: true, component: SinglePost },
	// category
	{ path: ['/category/:slug', '/category/:slug/page/:page'], exact: true, component: CategoryPage },
	// search
	{ path: ['/search', '/search/:slug', '/search//page/:page', '/search/:slug/page/:page'], exact: true, component: SearchPage },
	// page
	{ path: ['/:slug'], exact: true, component: PageComponent },
	// 404
	{ path: '*', component: Page404 },
];
