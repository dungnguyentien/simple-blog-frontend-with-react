import React from 'react';
import { compose } from 'redux';
import { Switch, Route, withRouter, matchPath } from 'react-router';
// import useStyles from 'isomorphic-style-loader/useStyles';
import withStyles from 'isomorphic-style-loader/withStyles';
import NProgress from 'nprogress';

// routes
import routes from './config/routes';

// components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// styles
import AppStyles from './assets/sass/app.scss';

class App extends React.Component {
	constructor(props) {
		super(props);

		const { pageInitialProps } = props;

		this.state = {
			location: this.props.location,
			nextLocation: null,
			needPrefetch: false,
			data: pageInitialProps || (typeof window !== 'undefined' ? window.__PAGE_INITIAL_PROPS__ : {}),
		};
	}

	static getDerivedStateFromProps(nextProps, state) {
		// console.log({ nextProps, prevState });
		let routeParams, nextRouteParams;
		const activeRoute = routes.find(route => (routeParams = matchPath(state.location.pathname, route)));
		const nextRoute = routes.find(route => (nextRouteParams = matchPath(nextProps.location.pathname, route)));

		const { params: { slug } = {} } = routeParams;
		const { params: { slug: nextSlug } = {} } = nextRouteParams;

		// const navigated = locationPath !== nextLocationPath;
		// only prefetch if next component/slug is different from the current component/slug
		const navigated = nextRoute.component !== activeRoute.component || slug !== nextSlug;
		let nextState = Object.assign({}, state);

		if (navigated) {
			nextState.nextLocation = nextProps.location;
			nextState.needPrefetch = true;
		}

		return nextState;
	}

	shouldComponentUpdate(nextProps, nextState) {
		// prefetch
		if (nextState.needPrefetch) {
			// start loading
			NProgress.start();

			this.getInitialProps(nextState.nextLocation);
			return false;
		} else {
			return true;
		}
	}

	componentDidUpdate() {
		NProgress.done();
	}

	getInitialProps(nextLocation) {
		routes.find(route => {
			const match = matchPath(nextLocation.pathname, route);
			if (match && route.component && route.component.GetInitialProps) {
				route.component.GetInitialProps({ routeParams: match }).then(data => {
					this.setState({
						location: nextLocation,
						nextLocation: null,
						needPrefetch: false,
						data,
					});
				});
			}
			return match;
		});
	}

	render() {
		const { globalData } = this.props;

		// global data
		const globalDataSync = globalData || (typeof window !== 'undefined' ? window.__GLOBAL_DATA__ : {});
		// const pageInitialPropsSync = pageInitialProps || (typeof window !== 'undefined' ? window.__PAGE_INITIAL_PROPS__ : {});
		const pageInitialPropsSync = this.state.data;

		return (
			<div className="App">
				<Header {...globalDataSync} />
				<div className="wrapper-main">
					<Switch location={this.state.location}>
						{routes.map(({ path, exact, component: RouteComponent }) => {
							return (
								<Route
									key={path.toString()}
									path={path}
									exact={exact}
									render={routeProps => {
										// console.log({ routeProps });
										return <RouteComponent {...routeProps} pageData={pageInitialPropsSync} />;
									}}
								/>
							);
						})}
					</Switch>
				</div>
				<Footer {...globalDataSync} />
			</div>
		);
	}
}

export default compose(
	withRouter,
	withStyles(AppStyles),
)(App);
