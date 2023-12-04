import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import AuthContext from "@context/AuthContext";
import LoginForm from "./LoginForm";

const LoginPage = () => {
	const { updateToken, token } = useContext(AuthContext);

	if (token) return <Navigate to="/chat" />;

	return (
		<main className="grid w-full h-[calc(100%-60px)] px-4 place-items-center">
			<div className="max-w-3xl grid grid-cols-2 max-h-[480px] shadow-2xl w-full h-full rounded-2xl overflow-hidden">
				<div className="grid h-full p-3 px-6 md:mx-12 place-items-center">
					<LoginForm updateToken={updateToken} />
				</div>
				<div className="h-full from-[#FF4B2B] to-[#FF416C] bg-gradient-to-r flex flex-col justify-center px-6 md:px-10">
					<h1 className="w-full text-[32px] font-extrabold text-center text-white">
						Hello, Friend!
					</h1>
					<p className="mx-auto mt-5 text-sm text-center text-white w-fit mb-7 font-sm">
						Always and everywhere keep in touch with your friends
					</p>
					<Link
						to="/register"
						className="uppercase bg-transparent px-11 py-3 font-[Arial] text-white w-fit mx-auto text-xs rounded-[20px] mt-0.5 font-bold tracking-wider border border-white"
					>
						Sign up
					</Link>
				</div>
			</div>
		</main>
	);
};

export default LoginPage;
