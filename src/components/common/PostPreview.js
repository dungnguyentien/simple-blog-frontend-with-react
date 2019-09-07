import React from 'react';
import { Link } from 'react-router-dom';

//
function PostPreview({ title, url, excerpt }) {
	return (
		<article>
			<h3>
				<Link to={url} title={title}>
					{title}
				</Link>
			</h3>
			<div>{excerpt}</div>
		</article>
	);
}

//
export default PostPreview;
