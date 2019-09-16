// import faker from 'faker';

// import { fakePost } from '../../utils/fakeDataHelpers';

// services
import { wpApi } from '../../services/apiService';

// function fakeGetPost() {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			// const success = faker.random.boolean();
// 			const success = true;
// 			// const success = false;

// 			// failure
// 			if (!success) {
// 				reject('404');
// 			}

// 			// success
// 			resolve(fakePost(slug));
// 		}, 1000);
// 	});
// }

function getPost({ slug }) {
	return new Promise((resolve, reject) => {
		wpApi
			.get('/wp/v2/posts', {
				params: {
					slug,
					seo_include: true,
				},
			})
			.then(response => (response.data.length > 0 ? resolve(response.data[0]) : reject('404')))
			.catch(error => reject(error));
	});
}

export default getPost;
