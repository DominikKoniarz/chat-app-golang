import { FaCircleUser } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { ChatUser } from "types/ChatPageTypes";

const UsersListItem = ({ user }: { user: ChatUser }) => {
	const location = useLocation();
	const path = `/chat/${user.userID}`;
	const pathname = location.pathname;

	return (
		<li className="w-full shrink-0 h-fit">
			<Link
				to={path}
				className={`flex flex-row items-center justify-start w-full h-full gap-3 p-3 transition-colors duration-300 rounded-lg hover:bg-gray-200 ${
					pathname === path ? "bg-gray-100" : "bg-transparent"
				}`}
			>
				<div className="hidden sm:block">
					<FaCircleUser />
				</div>
				<div className="hidden sm:block">{user.username}</div>
				<div className="block w-full text-center sm:hidden">
					{user.username.substring(0, 1).toUpperCase()}
				</div>
			</Link>
		</li>
	);
};

export default UsersListItem;
