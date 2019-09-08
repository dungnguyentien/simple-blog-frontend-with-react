import serialize from 'serialize-javascript';

// the cache will only persist in the current session/tab, and will be cleared when the tab/window is closed
let cache = {};

function getKey(query) {
	return serialize(query);
}

function getCache(query) {
	const key = getKey(query);
	if (cache.hasOwnProperties(key)) {
		return cache[key];
	}
	return null;
}

function updateCache(query, data) {
	cache[getKey(query)] = data;
}

function createApiService(apiArgs, apiFunctions) {
	// @TODO axios instance
	return apiFunctions.reduce();
}

export default createApiService;
