import axios from "axios";
import { getFormDataFromLocalStorage } from "./localStorageCart";
import { BASE_API, LOCAL_STORAGE_TOKEN } from "../utils/http-common";
import { getLocalStorage } from "../utils/LocalStorage";

const token = getLocalStorage(LOCAL_STORAGE_TOKEN);
const config = {
	headers: {
		Authorization: `Bearer ${token}`,
	},
};

const ORDER_URL = `${BASE_API}/order`;

export const checkoutOrder = async () => {
	const orderData = getFormDataFromLocalStorage();
	try {
		const data = await axios.post(ORDER_URL, orderData);
		const res = data.data;
		console.log(data);
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

export const getHistory = async () => {
	try {
		const data = await axios.get(ORDER_URL, config);
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
