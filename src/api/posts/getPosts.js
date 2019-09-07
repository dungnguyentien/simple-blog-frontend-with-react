import faker from 'faker';

//
import fakePosts from '../../utils/fakePosts';

//
async function getPosts(query) {
	return new Promise(resolve =>
		setTimeout(() => {
			// const success = faker.random.boolean();
			const success = true;

			// failure
			if (!success) {
				resolve({
					success: false,
					message: 'Something goes wrong, please reload the page or try later',
				});
				return;
			}

			// success
			resolve({
				success: true,
				posts: fakePosts(),
			});
		}, 1000),
	);
}

//
export default getPosts;
