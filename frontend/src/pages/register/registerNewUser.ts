import { REGISTER_URL } from "../../constants";

const registerNewUser = async (username: string, password: string) => {
	if (!username || !password)
		throw new Error("Both username and password are required!");

	let resultMessage: string = "";

	try {
		const fetchConfig = {
			method: "POST",
			cors: "cors",
			body: JSON.stringify({ username, password }),
		};

		const response: Response = await fetch(REGISTER_URL, fetchConfig);

		if (!response.ok) {
			const json = await response.json();
			throw new Error(json?.message);
		}

		resultMessage = "User registered successfully!";
	} catch (error: Error | unknown) {
		resultMessage =
			error instanceof Error ? error.message : "Unknown register Error!";
	}

	return resultMessage;
};

export default registerNewUser;
