import { ChatUser } from "../../types/ChatPageTypes";
import LogoutButton from "./LogoutButton";

import UsersListItem from "./UsersListItem";

type UsersListProps = {
	users: ChatUser[];
};

const UsersList = ({ users }: UsersListProps) => {
	return (
		<ul className="flex flex-col w-16 h-full transition-all duration-100 bg-teal-500 sm:w-48 md:w-56 shrink-0">
			{users.map((user, index) => (
				<UsersListItem user={user} key={index} />
			))}
			<LogoutButton />
		</ul>
	);
};

export default UsersList;
