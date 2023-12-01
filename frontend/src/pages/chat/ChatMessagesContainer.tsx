import { useOutletContext, useParams } from "react-router-dom";
import ChatMessagesForm from "./ChatMessagesForm";
import ChatMessagesList from "./ChatMessagesList";
import type { OutletContext } from "./ChatPage";
import { useState } from "react";
import PickChatMessage from "./PickChatMessage";

type ChatMessageListParams = {
	userID?: string;
};

const ChatMessagesContainer = () => {
	const [inputMessageValue, setInputMessageValue] = useState<string>("");
	const params = useParams() as ChatMessageListParams;
	const userID = params.userID;
	const { sendJsonMessage, addLoggedInUserMessage, messages, users } =
		useOutletContext<OutletContext>();

	return (
		<div className="flex flex-col w-full overflow-hidden">
			{userID === undefined ? (
				<PickChatMessage />
			) : (
				<>
					<ChatMessagesList messages={messages} userID={userID} users={users} />
					<ChatMessagesForm
						inputMessageValue={inputMessageValue}
						setInputMessageValue={setInputMessageValue}
						userID={userID}
						sendJsonMessage={sendJsonMessage}
						addLoggedInUserMessage={addLoggedInUserMessage}
					/>
				</>
			)}
		</div>
	);
};

export default ChatMessagesContainer;
