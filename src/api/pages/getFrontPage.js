// import faker from 'faker';

//
// import { fakePostPreviews } from '../../utils/fakeDataHelpers';

// services
import { wpApi } from '../../services/apiService';
import { getGlobalData } from '../../services/globalDataService';

// api
import apiGetPosts from '../posts/getPosts';

// function fakeGetFrontPage() {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			const { params: { page = 1 } = {} } = routeParams || {};

// 			// const success = faker.random.boolean();
// 			const success = true;

// 			// failure
// 			if (!success) {
// 				reject('Something goes wrong, please reload the page or try again later');
// 				return;
// 			}

// 			// success
// 			// fake data
// 			resolve({
// 				title: 'Home',
// 				seo: {
// 					title: 'home seo title - ' + faker.lorem.words(),
// 					description: faker.lorem.sentences(),
// 				},
// 				excerpt: faker.lorem.sentences(),
// 				postPageCount: faker.random.number({ min: 5, max: 7 }),
// 				posts: fakePostPreviews(),
// 			});
// 		}, 1000);
// 	});
// }

function getFrontPage({ page }) {
	return new Promise((resolve, reject) => {
		apiGetPosts({ page })
			.then(({ postPageCount, posts }) => {
				// global data for the index page
				const { title, seo } = getGlobalData();

				//
				resolve({
					title,
					seo,
					postPageCount,
					posts,
				});
			})
			.catch(error => {
				// console.log('error', error);
				reject(error);
			});
	});
}

//
export default getFrontPage;
