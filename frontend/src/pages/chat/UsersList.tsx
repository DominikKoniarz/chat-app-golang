import LogoutButton from "./LogoutButton";
import UsersListItem from "./UsersListItem";
import UsersListSearchInput from "./UsersListSearchInput";
import SmallLoader from "@components/SmallLoader";
import { useState } from "react";
import useFetchUsers from "./useFetchUsers";

type UsersListProps = {
	token: string | null;
};

const UsersList = ({ token }: UsersListProps) => {
	// Should be here also loading state and error
	const users = useFetchUsers(token);
	const [searchValue, setSearchValue] = useState<string>("");

	const filteredUsers = users.filter((user) =>
		user.username.toLowerCase().includes(searchValue.toLowerCase())
	);

	return (
		<ul className="flex flex-col w-16 h-full p-2 overflow-y-auto transition-all duration-100 gap-y-2 users-list sm:w-48 md:w-56 shrink-0">
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
