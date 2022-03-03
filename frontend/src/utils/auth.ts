import { checkAuth } from "@/api/auth";
import { getToken, user } from "@/store";
import { router } from "tinro";
import { networkError } from "./request";

export async function requireAuth() {
	if (!getToken()) {
		router.goto('/login');
	}

	try {
		let me = await checkAuth();
		user.set(me);
	} catch (e) {
		console.log(e);
		if (networkError(e)) {
			throw new Error('Internal error');
		}
	}
}