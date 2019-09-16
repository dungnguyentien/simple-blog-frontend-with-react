import { wpApi } from '../../services/apiService';

function getPage(slug) {
	return new Promise((resolve, reject) => {
		wpApi
			.get('/wp/v2/pages', {
				params: {
					slug,
					seo_include: true,
				},
			})
			.then(response => (response.data.length > 0 ? resolve(response.data[0]) : reject('404')))
			.catch(error => reject(error));
	});
}

export default getPage;
