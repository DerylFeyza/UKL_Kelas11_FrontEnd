import axios from "axios";
import { BASE_API, LOCAL_STORAGE_TOKEN } from "../utils/http-common";
import { setLocalStorage } from "../utils/LocalStorage";

const LOGIN_URL = BASE_API + "/admin/auth";

export const LoginHandler = async (userData) => {
	try {
		const data = await axios.post(LOGIN_URL, userData);
		const res = data.data;
		console.log(res.status);

		if (data.data.status == true) {
			const token = res.token;
			setLocalStorage(LOCAL_STORAGE_TOKEN, token);
			return { success: true };
		} else {
			console.log("sukibidi", data.data.status);
			return { success: false };
		}
	} catch (error) {
		return { error: "Failed to fetch data" };
	}
};
