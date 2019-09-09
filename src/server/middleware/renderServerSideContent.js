import React from 'react';
import ReactDomServer from 'react-dom/server';
import StyleContext from 'isomorphic-style-loader/StyleContext';
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

//
async function renderServerSideContent(req, res, next) {
	// html template
	const hbsTemplate = hbs.compile(htmlTemplate);

	// styles
	const css = new Set(); // CSS for all rendered React components
	const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()));

	// global props
	const globalData = await apiGetGlobalData();

	// active route
	let routeParams;
	const activeRoute = routes.find(route => (routeParams = matchPath(req.path, route)));
	const pageInitialProps = activeRoute.component.GetInitialProps ? await activeRoute.component.GetInitialProps({ req, res, routeParams }) : {};

	// app component
	const appContent = ReactDomServer.renderToString(
		<StyleContext.Provider value={{ insertCss }}>
			<Provider store={store}>
				<StaticRouter location={req.path} context={{}}>
					<App pageInitialProps={pageInitialProps} globalData={globalData} />
				</StaticRouter>
			</Provider>
		</StyleContext.Provider>,
	);

	// app head
	const appHead = ReactDomServer.renderToString(
		<AppHead css={css} globalData={globalData} pageInitialProps={pageInitialProps} initialState={store.getState()} />,
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
