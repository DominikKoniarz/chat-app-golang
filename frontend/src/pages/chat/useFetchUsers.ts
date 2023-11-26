import { GET_USERS_URL } from "@constants";
import { useEffect, useState } from "react";
import { ChatUser } from "types/ChatPageTypes";

type ReceivedChatUser = {
	userID: number;
	username: string;
};

const useFetchUsers = (token: string | null) => {
	const [users, setUsers] = useState<ChatUser[]>([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response: Response = await fetch(GET_USERS_URL, {
					method: "GET",
					headers: { Authorization: `Bearer ${token}` },
				});

				if (!response.ok) {
					const json = await response.json();

					throw new Error(json.message || "Unknown fetch users message!");
				}

				const json = await response.json();
				const message = json.message as ReceivedChatUser[];

				if (!message) throw new Error("Wrong users json structure!");

				const users: ChatUser[] = message.map((user) => {
					return {
						userID: user.userID,
						username: user.username,
						messages: [],
					};
				});

				setUsers(users);
			} catch (error: Error | unknown) {
				console.log(error);
			}
		};

		fetchUsers();
	}, [token]);

	return users;
};

export default useFetchUsers;
