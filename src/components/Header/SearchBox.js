import React from 'react';
import { withRouter } from 'react-router';

function SearchBox({ history, match }) {
	let { params: { slug: searchText = '' } = {} } = match;

	// not a search page
	if (!match.path.match(/^\/search\/:slug/)) {
		searchText = '';
	}

	//
	const handleKeyDown = e => {
		if (e.key === 'Enter') {
			history.push(`/search/${e.target.value}`);
		}
	};

	return (
		<div className="site-search">
			<input type="text" defaultValue={searchText} placeholder="Search..." onKeyDown={handleKeyDown} />
		</div>
	);
}

export default withRouter(SearchBox);
