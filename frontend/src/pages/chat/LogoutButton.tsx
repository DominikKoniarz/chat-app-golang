import { LOGOUT_URL } from "@constants";
import AuthContext from "@context/AuthContext";
import { useContext } from "react";
import { FaArrowRightFromBracket } from "react-icons/fa6";

const LogoutButton = () => {
	const { deleteToken } = useContext(AuthContext);

	const handleLogout = () => {
		try {
			fetch(LOGOUT_URL, {
				method: "GET",
				credentials: "include",
			});
			deleteToken();
		} catch (error: Error | unknown) {
			error instanceof Error && console.log(error.message);
		}
	};

	return (
		<button
			type="button"
			onClick={handleLogout}
			className="flex flex-row items-center justify-start w-full gap-3 p-3 mt-auto transition-colors duration-300 rounded-lg shrink-0 hover:bg-gray-200 active:bg-gray-100 text-color1"
		>
			<FaArrowRightFromBracket />
			Logout
		</button>
	);
};

export default LogoutButton;
