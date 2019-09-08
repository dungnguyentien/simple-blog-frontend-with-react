import React from 'react';
import serialize from 'serialize-javascript';

function AppHead({ css, globalData, pageInitialProps, initialState }) {
	// @TODO head items
	const {
		seo: { title: seoTitle, description: seoDescription },
	} = pageInitialProps;
	return (
		<React.Fragment>
			{/* SEO */}
			<title>{seoTitle}</title>
			<meta name="description" content={seoDescription} />

			{/* styles */}
			<style dangerouslySetInnerHTML={{ __html: [...css].join('') }} />

			{/* initial data */}
			<script type="text/javascript" dangerouslySetInnerHTML={{ __html: `window.__GLOBAL_DATA__=${serialize(globalData)};` }} />
			<script type="text/javascript" dangerouslySetInnerHTML={{ __html: `window.__PAGE_INITIAL_PROPS__=${serialize(pageInitialProps)};` }} />
			<script type="text/javascript" dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${serialize(initialState)};` }} />
		</React.Fragment>
	);
}

//
export default AppHead;
