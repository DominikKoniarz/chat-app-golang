import { ChatUser } from "../../types/ChatPageTypes";

const UsersListItem = ({ user }: { user: ChatUser }) => {
	return <li className="w-full p-4 shrink-0">{user.username}</li>;
};

export default UsersListItem;
