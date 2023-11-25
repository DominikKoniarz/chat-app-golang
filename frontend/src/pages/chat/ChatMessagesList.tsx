import { useParams } from "react-router-dom";

type ChatMessageListParams = {
	userID?: string;
};

const ChatMessagesList = () => {
	const params = useParams() as ChatMessageListParams;

	return (
		<ul className="grow shrink-0">
			{params.userID ? params.userID : "Wybierz chat!"}
		</ul>
	);
};

export default ChatMessagesList;
