import faker from 'faker';

// utils
import { fakePostPreviews } from '../../utils/fakeDataHelpers';

//
function getPosts(query) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			// const success = faker.random.boolean();
			const success = true;

			// failure
			if (!success) {
				reject('Something goes wrong, please reload the page or try again later');
				return;
			}

			// success
			resolve(fakePostPreviews());
		}, 1000);
	});
}

export default getPosts;
