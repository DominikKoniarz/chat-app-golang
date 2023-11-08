import { Outlet } from "react-router-dom";

const Layout = () => {
	return (
		<div className="w-full h-full flex flex-col">
			<header className="shrink-0 w-full text-center p-4 text-xl font-bold">
				Chat App Golang
			</header>
			<Outlet />
		</div>
	);
};

export default Layout;
