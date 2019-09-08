import React from 'react';

class Page404 extends React.Component {
	static GetInitialProps({ req, res }) {
		// server-side
		if (typeof window === 'undefined') {
			res.statusCode = 404;
		}

		return {
			seo: {
				title: '404 - Page not found',
				description: '',
			},
		};
	}

	render() {
		return <div>404 - page not found</div>;
	}
}

//
export default Page404;
