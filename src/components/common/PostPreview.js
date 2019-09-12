import React from 'react';
import { Link } from 'react-router-dom';

import PostMeta from './PostMeta';

//
function PostPreview({ title: { rendered: title }, slug, excerpt: { rendered: excerpt } = {}, modified_gmt: postedDate }) {
	// console.log(rest);
	return (
		<article className="post-preview">
			<h3 className="post-preview__title">
				<Link to={`/blog/${slug}`} title={title}>
					{title}
				</Link>
			</h3>
			<div dangerouslySetInnerHTML={{ __html: excerpt }} />
			<PostMeta postedDate={postedDate} />
		</article>
	);
}

//
export default PostPreview;
