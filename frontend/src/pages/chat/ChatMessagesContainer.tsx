import ChatMessagesList from "./ChatMessagesList";
import MessageForm from "./MessageForm";

const ChatMessagesContainer = () => {
	return (
		<div className="flex flex-col grow shrink-0">
			<ChatMessagesList />
			<MessageForm />
		</div>
	);
};

export default ChatMessagesContainer;
