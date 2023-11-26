import { WS_URL } from "@constants";
import { useContext } from "react";
import AuthContext from "@context/AuthContext";
import UsersList from "./UsersList";
import { Navigate, Outlet } from "react-router-dom";
import ChatMessagesContainer from "./ChatMessagesContainer";
import BigLoader from "@components/BigLoader";
import Error from "./Error";
import useSocket from "./useSocket";

const ChatPage = () => {
	const {
		token,
		deleteToken,
		isAuthenticated: checkIfAuthenticated,
	} = useContext(AuthContext);
	const { isAuthenticating, isAuthenticated, cannotConnect } = useSocket(
		WS_URL,
		token
	);

	return !checkIfAuthenticated() ? (
		<Navigate to="/login" />
	) : (
		<main className="flex flex-row w-full h-full grow">
			{!cannotConnect && isAuthenticating && <BigLoader />}
			{!cannotConnect && !isAuthenticating && isAuthenticated && (
				<>
					<UsersList token={token} />
					<ChatMessagesContainer>
						<Outlet />
					</ChatMessagesContainer>
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
