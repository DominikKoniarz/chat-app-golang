import { Outlet } from "react-router-dom";
import AuthContext from "@context/AuthContext";
import { useContext } from "react";

const Layout = () => {
	const { isTokenPreloaded } = useContext(AuthContext);

	if (!isTokenPreloaded) {
		return (
			<div className="grid w-full h-full place-items-center">
				<div className="h-10 w-10 border-[6px] rounded-full border-slate-100 border-t-blue-500 animate-spin"></div>
			</div>
		);
	} else {
		return (
			<div className="flex flex-col w-full h-full">
				<header className="w-full p-4 text-xl font-bold text-center shrink-0">
					Chat App Golang
				</header>
				<Outlet />
			</div>
		);
	}

	return;
};

export default Layout;
