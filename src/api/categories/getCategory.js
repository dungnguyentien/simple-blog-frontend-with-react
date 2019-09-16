// import faker from 'faker';

import { wpApi } from '../../services/apiService';

// import { fakeCategory, fakePostPreviews } from '../../utils/fakeDataHelpers';

// function getCategory({ slug }) {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			// const success = faker.random.boolean();
// 			const success = true;

// 			// failure
// 			if (!success) {
// 				reject('404');
// 				return;
// 			}

// 			// success
// 			resolve({
// 				...fakeCategory(slug),
// 				postPageCount: faker.random.number({ min: 5, max: 7 }),
// 				posts: fakePostPreviews(),
// 			});
// 		}, 1000);
// 	});
// }

function getCategory({ slug, page }) {
	return new Promise((resolve, reject) => {
		wpApi
			.get(`/sb/v1/category/${slug}`, {
				params: {
					page,
				},
			})
			.then(response => {
				const {
					data,
					headers: { 'x-wp-totalpages': postPageCount },
				} = response;

				resolve({
					...data,
					postPageCount: parseInt(postPageCount),
				});
			})
			.catch(error => reject(error));
	});
}

export default getCategory;
