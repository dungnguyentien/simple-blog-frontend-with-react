import faker from 'faker';

//
import fakePosts from '../../utils/fakePosts';

//
function getFrontPage({ routeParams }) {
	const { params: { page: currentPage = 1 } = {} } = routeParams || {};

	// fake data
	return {
		title: 'Home',
		seo: {
			title: 'home seo title - ' + faker.lorem.words(),
			description: faker.lorem.sentences(),
		},
		currentPage,
		postPageCount: faker.random.number({ min: 5, max: 7 }),
		posts: fakePosts(),
	};
}

//
export default getFrontPage;
