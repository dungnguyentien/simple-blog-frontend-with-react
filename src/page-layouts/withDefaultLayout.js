import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import PostMeta from '../components/common/PostMeta';

import './withDefaultLayout.scss';

function withDefaultLayout(PageComponent) {
	class DefaultLayout extends React.Component {
		render() {
			const {
				title: { rendered: title } = {},
				excerpt: { rendered: excerpt } = {},
				featured_media_data: { source_url: featuredUrl, alt_text: featuredAlt, title: { rendered: featuredTitle } = {} } = {},
				type: postType,
				modified_gmt: postedDate,
			} = this.props.pageData;
			return (
				<main className="site-main">
					<article>
						<header className="page-header">
							{featuredUrl && <img className="page-header__image" src={featuredUrl} alt={featuredAlt} title={featuredTitle} />}
							<div className="page-header__body">
								<h1 className="page-heading">{title}</h1>
								{excerpt && <div className="page-excerpt" dangerouslySetInnerHTML={{ __html: excerpt }} />}
								{postType === 'post' && <PostMeta postedDate={postedDate} />}
							</div>
						</header>

						<div className="page-content">
							<div className="page-content__inner">
								<PageComponent {...this.props} />
							</div>
						</div>
					</article>
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
