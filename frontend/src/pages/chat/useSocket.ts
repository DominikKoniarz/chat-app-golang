import AuthContext from "@context/AuthContext";
import { useContext, useState } from "react";
import useWebSocket from "react-use-websocket";

const RECONNECT_INTERVAL = 2500;
const RECONNECT_ATTEMPTS = 3;

type AuthRequest = {
	token: string;
};

type SuccessAuthMessage = { authenticated: true };
type FailedAuthMessage = { authenticated: false; authStatus: string };

type ReceiverAuthMessage = {
	event: "auth";
} & (SuccessAuthMessage | FailedAuthMessage);

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
	| ReceiverAuthMessage
	| ReceivedTextMessage
	| ReceivedErrorMessage;

function useSocket(url: string, token: string | null) {
	const { regenerateToken } = useContext(AuthContext);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);
	const [triedRefreshingToken, setTriedRefreshingToken] =
		useState<boolean>(false);
	const [cannotConnect, setCannotConnect] = useState<boolean>(false);
	const [lastTextMessage, setLastTextMessage] =
		useState<ReceivedTextMessage | null>(null);

	const sendAuthMessage = () => {
		const authMessage: AuthRequest = { token: token as string };

		sendJsonMessage(authMessage);
	};

	const handleAuthMessage = (message: ReceiverAuthMessage) => {
		if (message.authenticated) {
			setIsAuthenticated(true);
			setIsAuthenticating(false);
		} else {
			if (!triedRefreshingToken) return;
			setIsAuthenticating(false);
			console.log(message.authStatus);
		}
	};

	const handleTextMessage = (message: ReceivedTextMessage) => {
		console.log(message);
		setLastTextMessage(message);
	};

	const handleErrorMessage = (message: ReceivedErrorMessage) => {
		console.log(message);
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
					handleTextMessage(parsedMessage);
					break;
				case "error":
					handleErrorMessage(parsedMessage);
					break;
				default:
					console.log("Unknown message event!", parsedMessage);
			}
		} catch (error: Error | unknown) {
			console.log("Message parsing error", error);
		}
	};

	const handleClose = async () => {
		if (!triedRefreshingToken) {
			regenerateToken(() => {
				setTriedRefreshingToken(true);
			});
		} else {
			setIsAuthenticating(true);
			setIsAuthenticated(false);
		}
	};

	const { sendJsonMessage } = useWebSocket(url, {
		onOpen: () => sendAuthMessage(),
		onMessage: receiveMessage,
		onClose: handleClose,
		reconnectAttempts: RECONNECT_ATTEMPTS,
		reconnectInterval: RECONNECT_INTERVAL,
		shouldReconnect: () => true,
		onReconnectStop: () => {
			setCannotConnect(true);
		},
	});

	return {
		isAuthenticating,
		isAuthenticated,
		sendJsonMessage,
		cannotConnect,
		lastTextMessage,
	};
}

export default useSocket;
