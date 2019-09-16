// import faker from 'faker';

// utils
// import { fakePostPreviews } from '../../utils/fakeDataHelpers';

// services
import { wpApi } from '../../services/apiService';

//
import { extractPostData } from './getPost';

// function fakeGetPosts() {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			// const success = faker.random.boolean();
// 			const success = true;

// 			// failure
// 			if (!success) {
// 				reject('Something goes wrong, please reload the page or try again later');
// 				return;
// 			}

// 			// success
// 			resolve(fakePostPreviews());
// 		}, 1000);
// 	});
// }

function getPosts({ page, queryArgs }) {
	return new Promise((resolve, reject) => {
		wpApi
			.get('/wp/v2/posts', {
				params: {
					...queryArgs,
					page,
				},
			})
			.then(response => {
				const {
					data: posts,
					headers: { 'x-wp-totalpages': postPageCount },
				} = response;

				resolve({
					postPageCount: parseInt(postPageCount),
					posts,
				});
			})
			.catch(error => {
				// console.log(error);
				reject(error);
			});
	});
}

export default getPosts;
