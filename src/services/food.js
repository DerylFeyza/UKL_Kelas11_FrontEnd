import axios from "axios";
import { BASE_API, LOCAL_STORAGE_TOKEN } from "../utils/http-common";
import { getLocalStorage } from "../utils/LocalStorage";

const token = getLocalStorage(LOCAL_STORAGE_TOKEN);
const config = {
	headers: {
		Authorization: `Bearer ${token}`,
	},
};

const FOOD_URL = `${BASE_API}/food`;

export const imageFetcher = (foto) => {
	return `${FOOD_URL}/image/${foto}`;
};

export const getAllFood = async () => {
	const ALLFOOD_URL = `${FOOD_URL}/all`;
	try {
		const data = await axios.get(ALLFOOD_URL);
		const res = data.data;
		if (res.status === true) {
			return {
				status: true,
				data: res.data,
			};
		} else {
			return { res: res, status: false };
		}
	} catch (error) {
		return {
			status: false,
			message: error.response.data.message,
		};
	}
};

export const searchFood = async (search) => {
	const SEARCHFOOD_URL = `${FOOD_URL}/${search}`;
	try {
		const data = await axios.get(SEARCHFOOD_URL);
		const res = data.data;
		if (res.status === true) {
			return {
				status: true,
				data: res.data,
			};
		} else {
			return { res: res, status: false };
		}
	} catch (error) {
		return {
			status: false,
			message: error.response.data.message,
		};
	}
};

export const addFood = async (values) => {
	const ADD_URL = `${FOOD_URL}/`;
	try {
		const data = await axios.post(ADD_URL, values, config);
		const res = data.data;
		if (res.status === true) {
			return {
				status: true,
				data: res.data,
			};
		} else {
			return { res: res, status: false };
		}
	} catch (error) {
		return {
			status: false,
			message: error.response.data.message,
		};
	}
};

export const updateFood = async (id, values) => {
	const UPDATE_URL = `${FOOD_URL}/${id}`;
	try {
		const data = await axios.put(UPDATE_URL, values, config);
		const res = data.data;
		if (res.status === true) {
			return {
				status: true,
				data: res.data,
			};
		} else {
			return { res: res, status: false };
		}
	} catch (error) {
		return {
			status: false,
			message: error.response.data.message,
		};
	}
};

export const deleteFood = async (id) => {
	const DELETE_URL = `${FOOD_URL}/${id}`;

	try {
		const data = await axios.delete(DELETE_URL, config);
		const res = data.data;
		if (res.status === true) {
			return {
				status: true,
				data: res.data,
			};
		} else {
			return { res: res, status: false };
		}
	} catch (error) {
		return {
			status: false,
			message: error.response.data.message,
		};
	}
};
