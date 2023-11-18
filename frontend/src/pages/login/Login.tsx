import { useContext, useState } from "react";
import { LOGIN_URL } from "../../constants";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthContext from "@context/AuthContext";

const Login = () => {
	const { updateToken, token } = useContext(AuthContext);
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isPending, setIsPending] = useState<boolean>(false);
	const [loginError, setLoginError] = useState<string>("");
	const navigate = useNavigate();

	const handleOnSubmit = async (
		username: string,
		password: string
	): Promise<void> => {
		if (!username || !password) return;

		setIsPending(true);
		setLoginError("");
		try {
			const body: string = JSON.stringify({
				username,
				password,
			});

			const response: Response = await fetch(LOGIN_URL, {
				method: "POST",
				credentials: "include",
				body,
			});

			if (!response.ok) {
				const json = await response.json();
				if (json.message && typeof json.message === "string") {
					throw new Error(json.message);
				}

				throw new Error("Unknown login error!");
			}

			const json = await response.json();
			if (json.accessToken && typeof json.accessToken === "string") {
				const token = json.accessToken as string;
				updateToken(token);
				navigate("/chat");
			} else {
				setLoginError("Internal app error!");
				console.log("Not access token found in response!");
			}
		} catch (error: Error | unknown) {
			setLoginError(
				error instanceof Error ? error.message : "Unknown login Error!"
			);
		}

		setIsPending(false);
	};

	if (token) return <Navigate to="/chat" />;

	return (
		<main className="grid w-full h-full px-4 grow place-items-center">
			<div className="max-w-3xl grid grid-cols-2 max-h-[480px] shadow-2xl w-full h-full rounded-2xl overflow-hidden">
				<div className="grid h-full p-3 px-6 md:mx-12 place-items-center">
					<form
						className="flex flex-col justify-center w-full h-fit"
						onSubmit={(event) => {
							event.preventDefault();
							handleOnSubmit(username, password);
						}}
					>
						<h1 className="w-full mb-4 text-[32px] font-extrabold text-center">
							Sign in
						</h1>
						<label
							htmlFor="username"
							className="hidden absolute -left-[9999px]"
						>
							Username
						</label>
						<input
							type="text"
							name="username"
							id="username"
							placeholder="Username"
							className="py-3 px-4 bg-[#EEE] w-full my-2 text-sm"
							value={username}
							onChange={(event) => setUsername(event.target.value)}
						/>
						<label
							htmlFor="password"
							className="hidden absolute -left-[9999px]"
						>
							Password
						</label>
						<input
							type="password"
							name="password"
							id="password"
							placeholder="Password"
							className="py-3 px-4 bg-[#EEE] w-full my-2 text-sm"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
						/>
						{!isPending && loginError && (
							<div className="mx-auto mt-1 text-sm text-center w-fit">
								{loginError}
							</div>
						)}
						<button
							type="submit"
							className="uppercase bg-color1 px-11 py-3 font-[Arial] text-white w-fit mx-auto text-xs rounded-[20px] mt-3 font-bold tracking-wider min-w-[135px] min-h-[40px] transition-all duration-300"
						>
							{isPending ? (
								<div className="w-4 h-4 mx-auto border-[4px] rounded-full border-slate-50 border-t-blue-500 animate-spin"></div>
							) : (
								"Sign in"
							)}
						</button>
					</form>
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

export default Login;
