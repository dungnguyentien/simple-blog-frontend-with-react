import React from 'react';

class Page404 extends React.Component {
	static GetInitialProps({ req, res }) {
		res.statusCode = 404;
	}

	render() {
		return <div>404 - page not found</div>;
	}
}

//
export default Page404;
