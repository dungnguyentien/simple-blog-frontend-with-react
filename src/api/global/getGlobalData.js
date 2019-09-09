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
			url: '#',
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
	return new Promise((resolve, reject) => {
		// const success = faker.random.boolean();
		const success = true;

		// failure
		if (!success) {
			reject('Something goes wrong, please reload the page or try again later');
			return;
		}

		// success
		// fake data
		resolve({
			siteTitle: 'React App',
			logo: faker.image.imageUrl(100, 100, 'abstract'),
			primaryMenu: fakeMenu(),
			footerMenu: fakeMenu(),
		});
	});
}

//
export default getGlobalData;
