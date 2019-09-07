import React from 'react';
import { Switch, Route } from 'react-router';
import useStyles from 'isomorphic-style-loader/useStyles';

// styles
import AppStyle from './assets/sass/app.scss';

// routes
import { routes } from './server/middleware/renderServerSideContent';

// components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

//
function App({ pageInitialProps, globalData }) {
	// styles
	useStyles(AppStyle);

	// global data
	const globalDataSync = globalData || (typeof window !== 'undefined' ? window.__GLOBAL_DATA__ : {});
	const pageInitialPropsSync = pageInitialProps || (typeof window !== 'undefined' ? window.__PAGE_INITIAL_PROPS__ : {});

	//
	return (
		<div className="App">
			<Header {...globalDataSync} />
			<div className="wrapper-main">
				<Switch>
					{routes.map(({ path, exact, component: RouteComponent }) => (
						<Route key={path} path={path} exact={exact} render={routeProps => <RouteComponent {...routeProps} {...pageInitialPropsSync} />} />
					))}
				</Switch>
			</div>
			<Footer {...globalDataSync} />
		</div>
	);
}

export default App;
