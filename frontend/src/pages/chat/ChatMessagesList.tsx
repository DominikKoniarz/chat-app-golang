import { useEffect, useRef } from "react";
import { Message } from "./ChatPage";
import LoggedUserMessage from "./LoggedUserMessage";
import OtherUserMessage from "./OtherUserMessage";

type ChatMessagesListProps = {
	messages: Message[];
	userID: string;
};

const ChatMessagesList = ({ messages, userID }: ChatMessagesListProps) => {
	const listBotton = useRef<HTMLDivElement | null>(null);

	const filteredMessages: Message[] = messages.filter((message) => {
		if (message.type === "foreign") {
			return message.senderID === parseInt(userID);
		} else {
			return message.sendToUserID === parseInt(userID);
		}
	});

	useEffect(() => {
		if (!listBotton.current) return;

		listBotton.current.scrollIntoView({ behavior: "instant" });
	}, [messages]);

	return (
		<ul className="space-y-5 px-5 pt-5 list-none h-[calc(100vh-60px-62px)] overflow-y-auto w-full overflow-x-hidden">
			{filteredMessages.length === 0 ? (
				<div className="w-full text-sm text-center md:text-base">
					Możecie teraz pisać do siebie!
				</div>
			) : (
				filteredMessages.map((message) => {
					if (message.type === "foreign") {
						return (
							<OtherUserMessage
								message={message.messageString}
								username={message.senderUsername}
							/>
						);
					} else {
						return <LoggedUserMessage message={message.messageString} />;
					}
				})
			)}
			<div className="w-0 h-0 bg-transparent" ref={listBotton}></div>
		</ul>
	);
};

export default ChatMessagesList;
