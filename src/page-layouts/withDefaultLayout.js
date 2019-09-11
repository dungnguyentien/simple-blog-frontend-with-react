import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

function withDefaultLayout(PageComponent) {
	class DefaultLayout extends React.Component {
		render() {
			const { title, excerpt } = this.props.pageData;
			return (
				<main className="site-main">
					<div className="page-header">
						<div>
							<h1 className="page-heading">{title}</h1>
							{excerpt && <div className="page-excerpt">{excerpt}</div>}
						</div>
					</div>

					<PageComponent {...this.props} />
				</main>
			);
		}
	}

	// copy all WrappedComponent static functions
	hoistNonReactStatic(DefaultLayout, PageComponent);

	//
	return DefaultLayout;
}

export default withDefaultLayout;
