import faker from 'faker';

function fakePosts(count = 5) {
	return Array.from(Array(count), value => {
		const title = faker.lorem.words();
		return {
			id: faker.random.number(),
			title,
			url: `/post/${title.toLowerCase().replace(/ /g, '-')}`,
			excerpt: faker.lorem.sentences(),
		};
	});
}

//
export default fakePosts;
