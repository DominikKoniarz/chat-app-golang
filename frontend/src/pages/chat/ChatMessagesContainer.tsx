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
	const { sendJsonMessage } = useOutletContext<OutletContext>();

	return (
		<div className="flex flex-col w-full overflow-hidden">
			{userID === undefined ? (
				<PickChatMessage />
			) : (
				<>
					<ChatMessagesList />
					<ChatMessagesForm
						inputMessageValue={inputMessageValue}
						setInputMessageValue={setInputMessageValue}
						userID={userID}
						sendJsonMessage={sendJsonMessage}
					/>
				</>
			)}
		</div>
	);
};

export default ChatMessagesContainer;
