import { GET_USERS_URL } from "@constants";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@context/AuthContext";
import UsersList from "./UsersList";
import ChatMessagesContainer from "./ChatMessagesContainer";
import { ChatUser } from "types/ChatPageTypes";

const ChatPage = () => {
	const { token } = useContext(AuthContext);
	const [socket, setSocket] = useState<WebSocket | null>(null);
	const [users, setUsers] = useState<ChatUser[]>([]);

	useEffect(() => {
		setSocket((prev) => {
			if (prev instanceof WebSocket) {
				return prev;
			}

			const socket = new WebSocket("ws://localhost:3000/ws");

			socket.onopen = () => {
				socket.send(JSON.stringify({ token }));
				console.log("połączenie otwarte");
			};

			socket.onclose = () => {
				console.log("Połączenie zakończone");

				// setTimeout(() => {
				// 	setSocket(() => null);
				// 	console.log("Ponawianie połączenia!");
				// }, 1000);

				socket.onclose = null;
				socket.onopen = null;
				socket.onmessage = null;
				socket.onerror = null;
			};

			socket.onmessage = (message) => {
				console.log("Wiadomość: ", message?.data);
			};

			return socket;
		});

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
				const message = json.message;

				if (!message) throw new Error("Wrong users json structure!");

				setUsers(message);
			} catch (error: Error | unknown) {
				console.log(error);
			}
		};

		fetchUsers();

		return () => {
			if (socket) {
				socket.close();
			}
		};
	}, [socket, token]);

	// console.log(socket);
	// console.log(
	// 	socket?.CONNECTING,
	// 	socket?.OPEN,
	// 	socket?.CLOSING,
	// 	socket?.CLOSED
	// );

	return (
		<main className="flex flex-row w-full h-full grow ">
			<UsersList users={users} />
			<ChatMessagesContainer />
		</main>
	);
};

export default ChatPage;
