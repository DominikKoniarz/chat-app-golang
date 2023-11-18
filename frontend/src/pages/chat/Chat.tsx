import { LOGOUT_URL } from "../../constants";
import { useContext } from "react";
import AuthContext from "@context/AuthContext";

const Chat = () => {
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
		<main className="grid w-full h-full px-4 grow place-items-center">
			<div>chat</div>
			<button type="button" onClick={handleLogout}>
				Logout
			</button>
		</main>
	);
};

export default Chat;
