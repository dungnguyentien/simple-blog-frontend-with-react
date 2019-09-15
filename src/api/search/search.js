// services
import { wpApi } from '../../services/apiService';

export default function search({ search, page }) {
	return new Promise((resolve, reject) => {
		wpApi
			.get('/wp/v2/search', {
				params: {
					search,
					page,
				},
			})
			.then(response => {
				const {
					data: posts,
					headers: { 'x-wp-totalpages': postPageCount },
				} = response;

				resolve({
					title: {
						rendered: `Search Result For: ${search}`,
					},
					postPageCount: parseInt(postPageCount),
					posts,
				});
			})
			.catch(error => reject(error));
	});
}
