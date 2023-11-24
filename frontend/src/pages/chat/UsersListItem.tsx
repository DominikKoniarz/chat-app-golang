import { FaCircleUser } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { ChatUser } from "types/ChatPageTypes";

const UsersListItem = ({ user }: { user: ChatUser }) => {
	const location = useLocation();
	const path = `/chat/${user.username}`;
	const pathname = location.pathname;

	return (
		<li className="w-full shrink-0 h-fit">
			<Link
				to={path}
				className={`flex flex-row items-center justify-start w-full h-full gap-3 p-3 transition-colors duration-300 rounded-lg hover:bg-gray-200 ${
					pathname === path ? "bg-gray-100" : "bg-transparent"
				}`}
			>
				<FaCircleUser />
				{user.username}
			</Link>
		</li>
	);
};

export default UsersListItem;
