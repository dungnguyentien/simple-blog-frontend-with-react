import React from 'react';
import { Link } from 'react-router-dom';

function Pagination({ currentPage, pageCount, paginationPrefix, onClick }) {
	return (
		<nav aria-label="Page navigation">
			<ul className="pagination">
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
							<Link className="page-link" to={`${paginationPrefix}/${pageIndex}`}>
								{pageIndex}
							</Link>
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
