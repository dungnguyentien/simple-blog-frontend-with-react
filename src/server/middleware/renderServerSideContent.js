import React from 'react';
import ReactDomServer from 'react-dom/server';
import hbs from 'handlebars';
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

	// app component
	const appContent = ReactDomServer.renderToString(
		<Provider store={store}>
			<StaticRouter location={req.path} context={{}}>
				<App pageInitialProps={pageInitialProps} globalData={globalData} />
			</StaticRouter>
		</Provider>,
	);

	// app head
	const appHead = ReactDomServer.renderToString(
		<AppHead globalData={globalData} pageInitialProps={pageInitialProps} initialState={store.getState()} />,
	);

	// ssr content
	req.ssrContent = hbsTemplate({
		appHead,
		appContent,
	});

	// next
	next();
}

//
export default renderServerSideContent;
