import faker from 'faker';

export function fakePostPreviews(count = 5) {
	return Array.from(Array(count), value => {
		const title = faker.lorem.words();
		return {
			id: faker.random.number(),
			title,
			url: `/blog/${title.toLowerCase().replace(/ /g, '-')}`,
			excerpt: faker.lorem.sentences(),
		};
	});
}

export function fakePost(slug) {
	const title = slug.charAt(0).toUpperCase() + slug.substring(1).replace(/-/g, ' ');
	return {
		id: faker.random.number(),
		title,
		seo: {
			title: 'seo - ' + title,
			description: faker.random.sentences,
		},
		url: `/blog/${slug}`,
		content: Array.from(Array(faker.random.number({ min: 10, max: 15 })), () => {
			return `<p>${faker.lorem.paragraph()}</p>`;
		}).join(''),
	};
}
