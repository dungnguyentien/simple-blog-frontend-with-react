import React from 'react';
import ReactDomServer from 'react-dom/server';
import hbs from 'handlebars';
// import Loadable from 'react-loadable';
// import { getBundles } from 'react-loadable/webpack';
import { StaticRouter, matchPath } from 'react-router';
import { Provider } from 'react-redux';

// html template
import htmlTemplate from '../../assets/template.html';

// store
import store from '../../store';

// routes
import routes from '../../config/routes';

//
import App from '../../App';
import AppHead from '../../components/AppHead/AppHead';

// api
import apiGetGlobalData from '../../api/global/getGlobalData';

// services
import { setGlobalData } from '../../services/globalDataService';

// reloadable stats
// const reloadableStats = require('../../../buildServer/react-loadable.json');
const webpackStats = require('../../../buildServer/stats.json');

//
async function renderServerSideContent(req, res, next) {
	// html template
	const hbsTemplate = hbs.compile(htmlTemplate);

	// global props
	const globalData = await apiGetGlobalData();
	setGlobalData(globalData);

	// active route
	let routeParams;
	const activeRoute = routes.find(route => (routeParams = matchPath(req.path, route)));
	const pageInitialProps = activeRoute.component.GetInitialProps ? await activeRoute.component.GetInitialProps({ req, res, routeParams }) : {};

	// let modules = [];

	// app component
	const appContent = ReactDomServer.renderToString(
		// <Loadable.Capture report={moduleName => modules.push(moduleName)}>
		<Provider store={store}>
			<StaticRouter location={req.path} context={{}}>
				<App pageInitialProps={pageInitialProps} globalData={globalData} />
			</StaticRouter>
		</Provider>,
		// </Loadable.Capture>,
	);
	// console.log(modules);

	// let bundles = getBundles(reloadableStats, modules);

	// let styles = bundles.filter(bundle => bundle.file.endsWith('.css'));
	// let scripts = bundles.filter(bundle => bundle.file.endsWith('.js'));

	// console.log(bundles, styles, scripts);

	const { app } = webpackStats.assetsByChunkName;
	// console.log(app, vendorJs, app.filter(bundle => bundle.endsWith('.css')));

	const styles = app
		.filter(bundle => bundle.endsWith('.css'))
		.map(styleUrl => {
			return `<link href="/build/${styleUrl}" rel="stylesheet"/>`;
		})
		.join('');

	const scripts = app
		.filter(bundle => bundle.endsWith('.js'))
		.map(scriptUrl => {
			return `<script src="/build/${scriptUrl}"></script>`;
		})
		.join('');
	// console.log({ styles, scripts });

	// app head
	const appHead = ReactDomServer.renderToString(
		<AppHead globalData={globalData} pageInitialProps={pageInitialProps} initialState={store.getState()} />,
	);

	// ssr content
	req.ssrContent = hbsTemplate({
		appHead,
		appContent,
		styles,
		scripts,
	});

	// next
	next();
}

//
export default renderServerSideContent;
