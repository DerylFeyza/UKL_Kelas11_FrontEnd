export const setLocalStorage = (key, value) => {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
		console.error("Error setting item in local storage:", error);
	}
};

export const getLocalStorage = (key) => {
	try {
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) : null;
	} catch (error) {
		console.error("Error getting item from local storage:", error);
		return null;
	}
};

export const removeLocalStorage = (key) => {
	try {
		localStorage.removeItem(key);
	} catch (error) {
		console.error("Error removing item from local storage:", error);
	}
};
