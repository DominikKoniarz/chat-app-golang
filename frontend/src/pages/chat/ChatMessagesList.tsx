import { useEffect, useRef } from "react";
import { Message } from "./ChatPage";
import LoggedUserMessage from "./LoggedUserMessage";
import OtherUserMessage from "./OtherUserMessage";
import { ChatUser } from "types/ChatPageTypes";

type ChatMessagesListProps = {
	messages: Message[];
	userID: string;
	users: ChatUser[];
};

const ChatMessagesList = ({
	messages,
	userID,
	users,
}: ChatMessagesListProps) => {
	const listBotton = useRef<HTMLDivElement | null>(null);

	const filteredMessages: Message[] = messages.filter((message) => {
		if (message.type === "foreign") {
			return message.senderID === parseInt(userID);
		} else {
			return message.sendToUserID === parseInt(userID);
		}
	});

	const foundUser = users.find((user) => user.userID === parseInt(userID));

	const foundUserUsername: string = foundUser
		? foundUser.username
		: "Unknown user";

	useEffect(() => {
		if (!listBotton.current) return;

		listBotton.current.scrollIntoView({ behavior: "instant" });
	}, [messages]);

	return (
		<ul className="space-y-5 px-5 pt-5 list-none h-[calc(100vh-60px-62px)] overflow-y-auto w-full overflow-x-hidden">
			{filteredMessages.length === 0 ? (
				<li className="w-full text-sm text-center md:text-base">
					Chatuj z: {foundUserUsername}
					<br />
					Możecie teraz pisać do siebie!
				</li>
			) : (
				filteredMessages.map((message, index) => {
					if (message.type === "foreign") {
						return (
							<OtherUserMessage
								key={index}
								message={message.messageString}
								username={foundUserUsername}
							/>
						);
					} else {
						return (
							<LoggedUserMessage key={index} message={message.messageString} />
						);
					}
				})
			)}
			<div className="w-0 h-0 bg-transparent" ref={listBotton}></div>
		</ul>
	);
};

export default ChatMessagesList;
