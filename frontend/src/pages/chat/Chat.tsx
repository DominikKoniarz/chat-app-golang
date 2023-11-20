import { LOGOUT_URL } from "../../constants";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@context/AuthContext";

const Chat = () => {
	const { deleteToken } = useContext(AuthContext);
	const [socket, setSocket] = useState<WebSocket | null>(null);

	const handleLogout = () => {
		try {
			fetch(LOGOUT_URL, {
				method: "GET",
				credentials: "include",
			});
			deleteToken();
		} catch (error: Error | unknown) {
			error instanceof Error && console.log(error.message);
		}
	};

	useEffect(() => {
		setSocket((prev) => {
			if (prev instanceof WebSocket) {
				return prev;
			}

			const socket = new WebSocket("ws://localhost:3000/ws");

			socket.onopen = () => {
				console.log("połączenie otwarte");
			};

			socket.close = () => {
				console.log("Połączenie zakończone");
			};

			socket.onmessage = (message) => {
				console.log("Wiadomość: ", message);
			};

			return socket;
		});

		return () => {
			if (socket) {
				socket.close();
			}
		};
	}, [socket]);

	// console.log(socket);
	// console.log(
	// 	socket?.CONNECTING,
	// 	socket?.OPEN,
	// 	socket?.CLOSING,
	// 	socket?.CLOSED
	// );

	return (
		<main className="grid w-full h-full px-4 grow place-items-center">
			<div>chat</div>
			<button type="button" onClick={handleLogout}>
				Logout
			</button>
		</main>
	);
};

export default Chat;
