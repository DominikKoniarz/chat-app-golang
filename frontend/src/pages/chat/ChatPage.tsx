import { WS_URL } from "@constants";
import { useContext } from "react";
import AuthContext from "@context/AuthContext";
import UsersList from "./UsersList";
import { Navigate, Outlet } from "react-router-dom";
import BigLoader from "@components/BigLoader";
import Error from "./Error";
import useSocket from "./useSocket";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import useFetchUsers from "./useFetchUsers";

export type OutletContext = {
	sendJsonMessage: SendJsonMessage;
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

	console.log(lastTextMessage); // z tym się będę teraz bawić

	return !checkIfAuthenticated() ? (
		<Navigate to="/login" />
	) : (
		<main className="flex flex-row w-full h-full grow">
			{!cannotConnect && isAuthenticating && <BigLoader />}
			{!cannotConnect && !isAuthenticating && isAuthenticated && (
				<>
					<UsersList users={users} />
					<Outlet context={{ sendJsonMessage } satisfies OutletContext} />
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
