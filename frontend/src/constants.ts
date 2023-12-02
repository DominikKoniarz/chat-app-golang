const BASE_URL: string = !import.meta.env.PROD
	? "http://localhost:3000"
	: "https://chatappgolang.dominikkoniarz.pl/";

export const LOCAL_STORAGE_TOKEN_KEY_NAME: string = "chat-app-golang-token";

export const LOGIN_URL: string = `${BASE_URL}/login`;
export const REGISTER_URL: string = `${BASE_URL}/register`;
export const LOGOUT_URL: string = `${BASE_URL}/logout`;
export const GET_USERS_URL: string = `${BASE_URL}/users`;
export const REFRESH_TOKEN_URL: string = `${BASE_URL}/refresh-token`;

export const WS_URL: string = !import.meta.env.PROD
	? "ws://localhost:3000/ws"
	: "wss://chatappgolang.dominikkoniarz.pl/ws";
