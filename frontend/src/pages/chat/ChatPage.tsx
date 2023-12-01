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

type LoggedInUserMessage = {
	type: "own";
	timestamp: number;
	sendToUserID: number;
	messageString: string;
};

type OtherUserMessage = {
	type: "foreign";
	timestamp: number;
	senderID: number;
	receiverID: number;
	senderUsername: string;
	messageString: string;
};

export type Message = LoggedInUserMessage | OtherUserMessage;

export type OutletContext = {
	sendJsonMessage: SendJsonMessage;
	addLoggedInUserMessage: (id: number, messageString: string) => void;
	messages: Message[];
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
	const [messages, setMessages] = useState<Message[]>([]);

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

		const newMessage: OtherUserMessage = {
			type: "foreign",
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

	const addLoggedInUserMessage = (id: number, messageString: string): void => {
		const newMessage: LoggedInUserMessage = {
			type: "own",
			timestamp: Date.now(),
			sendToUserID: id,
			messageString,
		};

		setMessages((prev) => {
			return [...prev, newMessage];
		});
	};

	return !checkIfAuthenticated() ? (
		<Navigate to="/login" />
	) : (
		<main className="flex flex-row w-full shrink-0 grow">
			{!cannotConnect && isAuthenticating && <BigLoader />}
			{!cannotConnect && !isAuthenticating && isAuthenticated && (
				<>
					<UsersList users={users} />
					<Outlet
						context={
							{
								sendJsonMessage,
								addLoggedInUserMessage,
								messages,
							} satisfies OutletContext
						}
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
