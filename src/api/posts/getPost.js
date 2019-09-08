import faker from 'faker';

import { fakePost } from '../../utils/fakeDataHelpers';

function getPost({ slug }) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const success = faker.random.boolean();
			// const success = true;
			// const success = false;

			// failure
			if (!success) {
				reject('404');
			}

			// success
			resolve(fakePost(slug));
		}, 1000);
	});
}

export default getPost;
