import { useState } from "react";
import useWebSocket from "react-use-websocket";

type AuthMessage = {
	token: string;
};

type AuthResponse = {
	event: "auth";
} & ({ authenticated: true } | { authenticated: false; authStatus: string });

type ReceivedTextMessage = {
	event: "message";
	senderID: number;
	receiverID: number;
	messageString: string;
};

type ReceivedErrorMessage = {
	event: "error";
	errorString: string;
};

type MessageFromServer =
	| AuthResponse
	| ReceivedTextMessage
	| ReceivedErrorMessage;

function useSocket(url: string, token: string | null) {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);
	const [authenticationError, setAuthenticationError] = useState<string>("");

	const sendAuthMessage = () => {
		const authMessage: AuthMessage = { token: token as string };

		sendJsonMessage(authMessage);
	};

	const handleAuthMessage = (message: AuthResponse) => {
		if (message.authenticated) {
			setIsAuthenticated(true);
			setIsAuthenticating(false);
		} else {
			setIsAuthenticating(false);
			setAuthenticationError(message.authStatus);
		}
	};

	const receiveMessage = (e: MessageEvent) => {
		try {
			const parsedMessage = JSON.parse(e.data) as MessageFromServer;
			const event = parsedMessage.event;

			switch (event) {
				case "auth":
					handleAuthMessage(parsedMessage);
					break;
				case "message":
					console.log(parsedMessage);
					break;
				case "error":
					console.log(parsedMessage);
					break;
				default:
					console.log(parsedMessage);
			}
		} catch (error: Error | unknown) {
			console.log("Message parsing error", error);
		}
	};

	const { sendJsonMessage } = useWebSocket(url, {
		onOpen: () => sendAuthMessage(),
		onMessage: receiveMessage,
		onClose: () => console.log("połączneie zamknięte"),
		// reconnectAttempts: 3,
		// reconnectInterval: 2000,
		// shouldReconnect: () => true,
	});

	return { isAuthenticating, isAuthenticated, authenticationError };
}

export default useSocket;
