import faker from 'faker';

//
function fakeMenu() {
	return [
		{
			id: faker.random.number(),
			url: '/',
			title: 'Home',
		},
		{
			id: faker.random.number(),
			url: '/categories',
			title: 'Categories',
			children: Array.from(Array(faker.random.number({ min: 3, max: 5 })), number => {
				const title = faker.lorem.words();
				return {
					id: faker.random.number(),
					title,
					url: `/category/${title.toLowerCase().replace(/ /g, '-')}`,
				};
			}),
		},
	];
}

//
function getGlobalData() {
	// @TODO call api to load global data
	// fake data
	return {
		siteTitle: 'React App',
		logo: faker.image.imageUrl(100, 100, 'abstract'),
		primaryMenu: fakeMenu(),
		footerMenu: fakeMenu(),
	};
}

//
export default getGlobalData;
