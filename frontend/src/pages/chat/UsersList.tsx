import LogoutButton from "./LogoutButton";
import UsersListItem from "./UsersListItem";
import UsersListSearchInput from "./UsersListSearchInput";
import SmallLoader from "@components/SmallLoader";
import { useState } from "react";
import type { ChatUser } from "types/ChatPageTypes";

type UsersListProps = {
	users: ChatUser[];
};

const UsersList = ({ users }: UsersListProps) => {
	// Should be here also loading state and error for users
	const [searchValue, setSearchValue] = useState<string>("");

	const filteredUsers = users.filter((user) =>
		user.username.toLowerCase().includes(searchValue.toLowerCase())
	);

	return (
		<ul className="z-10 h-[calc(100vh-60px)] flex flex-col w-16 gap-2 p-2 transition-all duration-100 shrink-0 users-list sm:w-48 md:w-56">
			<UsersListSearchInput
				searchValue={searchValue}
				setSearchValue={setSearchValue}
			/>
			{users.length ? (
				filteredUsers.map((user, index) => (
					<UsersListItem user={user} key={index} />
				))
			) : (
				<SmallLoader />
			)}
			<LogoutButton />
		</ul>
	);
};

export default UsersList;
