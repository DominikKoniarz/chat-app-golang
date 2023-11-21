import { LOGOUT_URL } from "@constants";
import AuthContext from "@context/AuthContext";
import { useContext } from "react";

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
			className="w-full p-4 mt-auto shrink-0"
		>
			Logout
		</button>
	);
};

export default LogoutButton;
