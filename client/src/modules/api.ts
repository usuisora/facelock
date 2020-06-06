import axios from 'axios';
import { ApiBaseUrl } from '../constants/env';

export async function postData(url, body = {}) {
	let res = await axios.post(url, body, { withCredentials: true });
	let data = await res.data;
	return await data;
}

export async function deleteData(url) {
	let res = await axios.delete(url, { withCredentials: true });
	let data = await res.data;
	return await data;
}
export async function updateData(url, body = {}) {
	let res = await axios.put(url, body, { withCredentials: true });
	let data = await res.data;
	return await data;
}

export async function getData<T>(url, params = {}) {
	let res = await axios.get(ApiBaseUrl + url, { withCredentials: true, params });
	let data = await res.data;
	return (await data) as T;
}
