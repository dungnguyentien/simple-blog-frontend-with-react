import axios from 'axios';

const wpApi = axios.create({
	baseURL: process.env.WP_REST_API_BASE_URL,
});

export { wpApi };
