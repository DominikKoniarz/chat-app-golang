import { WS_URL } from "@constants";
import { useContext } from "react";
import AuthContext from "@context/AuthContext";
import UsersList from "./UsersList";
import { Navigate, Outlet } from "react-router-dom";
import ChatMessagesContainer from "./ChatMessagesContainer";
import BigLoader from "@components/BigLoader";
import AuthError from "./AuthError";
import useSocket from "./useSocket";

const ChatPage = () => {
	const {
		token,
		deleteToken,
		isAuthenticated: checkIfAuthenticated,
	} = useContext(AuthContext);
	const { isAuthenticating, isAuthenticated, authenticationError } = useSocket(
		WS_URL,
		token
	);

	return !checkIfAuthenticated() ? (
		<Navigate to="/login" />
	) : (
		<main className="flex flex-row w-full h-full grow">
			{isAuthenticating && <BigLoader />}
			{!isAuthenticating && !isAuthenticated && (
				<AuthError error={authenticationError} deleteToken={deleteToken} />
			)}
			{!isAuthenticating && isAuthenticated && (
				<>
					<UsersList token={token} />
					<ChatMessagesContainer>
						<Outlet />
					</ChatMessagesContainer>
				</>
			)}
		</main>
	);
};

export default ChatPage;
