import ChatMessagesForm from "./ChatMessagesForm";

type ChatMessagesContainerProps = {
	children: JSX.Element;
};

const ChatMessagesContainer = ({ children }: ChatMessagesContainerProps) => {
	return (
		<div className="flex flex-col grow shrink-0">
			{children}
			<ChatMessagesForm />
		</div>
	);
};

export default ChatMessagesContainer;
