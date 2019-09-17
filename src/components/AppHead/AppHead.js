import React from 'react';
import serialize from 'serialize-javascript';

function AppHead({ globalData, pageInitialProps, initialState }) {
	// @TODO head items
	const {
		title: { rendered: title },
		seo = {},
	} = pageInitialProps;

	const { title: seoTitle, description: seoDescription, canonical, meta = [] } = seo;
	console.log(meta);

	return (
		<React.Fragment>
			{/* SEO */}
			<title>{seoTitle || title}</title>
			{seoDescription && <meta name="description" content={seoDescription} />}
			<link rel="canonical" href={canonical} />

			{/* meta tags */}
			{meta.map((item, itemIndex) => {
				return <meta key={itemIndex} {...item} />;
			})}

			{/* initial data */}
			<script type="text/javascript" dangerouslySetInnerHTML={{ __html: `window.__GLOBAL_DATA__=${serialize(globalData)};` }} />
			<script type="text/javascript" dangerouslySetInnerHTML={{ __html: `window.__PAGE_INITIAL_PROPS__=${serialize(pageInitialProps)};` }} />
			<script type="text/javascript" dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${serialize(initialState)};` }} />
		</React.Fragment>
	);
}

//
export default AppHead;
