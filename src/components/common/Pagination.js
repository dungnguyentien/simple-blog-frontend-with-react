import React from 'react';
import { Link } from 'react-router-dom';

import './Pagination.scss';

function Pagination({ currentPage, pageCount, paginationPrefix }) {
	return (
		<nav className="pagination" aria-label="Page navigation">
			<ul>
				{/* previous button */}
				<li className="page-item">
					{currentPage < 2 && <span className="page-link disabled">Previous</span>}
					{currentPage > 1 && (
						<Link className="page-link" to={`${paginationPrefix}/${currentPage - 1}`}>
							Previous
						</Link>
					)}
				</li>
				{/* pagination */}
				{Array.from(Array(pageCount), (value, number) => {
					const pageIndex = number + 1;
					return (
						<li key={pageIndex} className={`page-item ${pageIndex === currentPage ? 'active' : ''}`}>
							{pageIndex === currentPage && <span>{pageIndex}</span>}

							{pageIndex !== currentPage && (
								<Link className="page-link" to={`${paginationPrefix}/${pageIndex}`}>
									{pageIndex}
								</Link>
							)}
						</li>
					);
				})}
				{/* next button */}
				<li className="page-item">
					{currentPage >= pageCount && <span className="page-link disabled">Next</span>}
					{currentPage < pageCount && (
						<Link className="page-link" to={`${paginationPrefix}/${currentPage + 1}`}>
							Next
						</Link>
					)}
				</li>
			</ul>
		</nav>
	);
}

//
export default Pagination;
