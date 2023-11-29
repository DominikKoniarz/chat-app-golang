import { FaPaperPlane } from "react-icons/fa6";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";

type ChatMessagesFormProps = {
	inputMessageValue: string;
	setInputMessageValue: React.Dispatch<React.SetStateAction<string>>;
	userID: string;
	sendJsonMessage: SendJsonMessage;
};

type TextPrivateMessage = {
	receiverID: number;
	event: string;
	messageString: string;
};

const ChatMessagesForm = ({
	inputMessageValue,
	setInputMessageValue,
	userID,
	sendJsonMessage,
}: ChatMessagesFormProps) => {
	const sendTextMessage = (userID: string, message: string) => {
		const userIDAsNumber = parseInt(userID);
		const newMessage: TextPrivateMessage = {
			receiverID: userIDAsNumber,
			event: "message",
			messageString: message,
		};

		sendJsonMessage(newMessage);
		setInputMessageValue("");
	};

	return (
		<form
			name="chatMessagesForm"
			id="chatMessagesForm"
			className="flex flex-row w-full gap-3 p-3 bg-white shrink-0"
			onSubmit={(event) => {
				event.preventDefault();
				if (inputMessageValue.length === 0) return;
				sendTextMessage(userID, inputMessageValue);
			}}
		>
			<input
				value={inputMessageValue}
				onChange={(event) => setInputMessageValue(event.target.value)}
				type="text"
				placeholder="Aa"
				className="w-full p-2 text-sm transition-all duration-300 border outline-none placeholder-slate-700 rounded-2xl focus:placeholder-slate-400 border-slate-100 bg-slate-100 text-slate-900"
			/>

			<button
				type="submit"
				className={`transition-all duration-300 p-1 ${
					inputMessageValue.length ? "block" : "hidden"
				}`}
			>
				<FaPaperPlane />
			</button>
		</form>
	);
};

export default ChatMessagesForm;
