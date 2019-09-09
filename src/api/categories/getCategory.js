import faker from 'faker';

import { fakeCategory, fakePostPreviews } from '../../utils/fakeDataHelpers';

function getCategory({ slug }) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			// const success = faker.random.boolean();
			const success = true;

			// failure
			if (!success) {
				reject('404');
				return;
			}

			// success
			resolve({
				...fakeCategory(slug),
				postPageCount: faker.random.number({ min: 5, max: 7 }),
				posts: fakePostPreviews(),
			});
		}, 1000);
	});
}

export default getCategory;
