import LoggedUserMessage from "./LoggedUserMessage";
import OtherUserMessage from "./OtherUserMessage";

const ChatMessagesList = () => {
	return (
		<ul className="space-y-5 px-5 pt-5 list-none h-[calc(100vh-60px-62px)] overflow-y-auto w-full overflow-x-hidden">
			<OtherUserMessage message="gagagagagagag ssss" username="some_user" />
			<LoggedUserMessage message="gagagagagagag ssss" />
		</ul>
	);
};

export default ChatMessagesList;
