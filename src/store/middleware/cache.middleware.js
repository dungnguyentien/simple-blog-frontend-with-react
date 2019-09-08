import { call } from 'redux-saga/effects';
import serialize from 'serialize-javascript';

// the cache will only persist in the current session/tab, and will be cleared when the tab/window is closed
let cache = {};

const cacheHandler = ({ dispatch }) => next => action => {
	// do not use cache on server side
	if (typeof window === 'undefined') {
		return next(action);
	}

	const { useCache, saveCache, cacheKey } = action;

	// cache key
	if (saveCache) {
		// save cache
		cache[cacheKey] = {
			...cache[cacheKey],
			[window.location.href]: action.payload,
		};
		return next(action);
	}

	// do not use cache
	if (!useCache) {
		return next(action);
	}

	// has cache
	if (cache[cacheKey] && cache[cacheKey][window.location.href]) {
		const newAction = useCache(cache[cacheKey][window.location.href], false);
		dispatch(newAction);
		return;
	}

	return next(action);
};

export default cacheHandler;
