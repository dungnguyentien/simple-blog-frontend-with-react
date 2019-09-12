import React from 'react';

import { formatDate } from '../../utils/dateHelpers';

function PostMeta({ postedDate }) {
	return (
		<div className="post-meta">
			<span>{formatDate(postedDate)}</span>
		</div>
	);
}

export default PostMeta;
