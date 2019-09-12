let globalData = null;

function setGlobalData(data) {
	globalData = data;
}

function getGlobalData() {
	return globalData;
}

export { getGlobalData, setGlobalData };
