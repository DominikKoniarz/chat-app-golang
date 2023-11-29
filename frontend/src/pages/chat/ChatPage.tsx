import { WS_URL } from "@constants";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@context/AuthContext";
import UsersList from "./UsersList";
import { Navigate, Outlet } from "react-router-dom";
import BigLoader from "@components/BigLoader";
import Error from "./Error";
import useSocket from "./useSocket";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import useFetchUsers from "./useFetchUsers";
import { ChatUser } from "types/ChatPageTypes";

export type OutletContext = {
	sendJsonMessage: SendJsonMessage;
	users: ChatUser[];
};

type UserMessage = {
	timestamp: number;
	senderID: number;
	receiverID: number;
	senderUsername: string;
	messageString: string;
};

const ChatPage = () => {
	const {
		token,
		deleteToken,
		isAuthenticated: checkIfAuthenticated,
	} = useContext(AuthContext);
	const users = useFetchUsers(token);
	const {
		isAuthenticating,
		isAuthenticated,
		cannotConnect,
		sendJsonMessage,
		lastTextMessage,
	} = useSocket(WS_URL, token);
	const [messages, setMessages] = useState<UserMessage[]>([]);

	// console.log(lastTextMessage);

	useEffect(() => {
		if (lastTextMessage === null) return;

		const receiverID = lastTextMessage.receiverID;
		const senderID = lastTextMessage.senderID;
		const messageString = lastTextMessage.messageString;

		const senderUser = users.find((user) => user.userID === senderID);

		if (senderUser === undefined) {
			console.log("No user with specified ID", senderID);
			return;
		}
		const senderUsername = senderUser.username;

		const newMessage: UserMessage = {
			receiverID,
			senderID,
			timestamp: Date.now(),
			messageString,
			senderUsername,
		};

		setMessages((prev) => {
			return [...prev, newMessage];
		});
	}, [lastTextMessage, users]);

	console.log(messages);

	return !checkIfAuthenticated() ? (
		<Navigate to="/login" />
	) : (
		<main className="flex flex-row w-full shrink-0 grow">
			{!cannotConnect && isAuthenticating && <BigLoader />}
			{!cannotConnect && !isAuthenticating && isAuthenticated && (
				<>
					<UsersList users={users} />
					<Outlet
						context={{ sendJsonMessage, users } satisfies OutletContext}
					/>
				</>
			)}
			{cannotConnect && (
				<Error
					error="Cannot connect with server!"
					deleteToken={deleteToken}
					text="Server connection error!"
				/>
			)}
		</main>
	);
};

export default ChatPage;
