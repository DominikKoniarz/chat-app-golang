import { useState } from "react";
import { LOGIN_URL } from "../constants";
import { Link } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleOnSubmit = async (
		email: string,
		password: string
	): Promise<void> => {
		if (!email || !password) return;

		try {
			const body: string = JSON.stringify({
				email,
				password,
			});

			const response: Response = await fetch(LOGIN_URL, {
				method: "POST",
				body,
			});

			if (!response.ok) {
				throw Error("error");
			}

			console.log(response.status, await response.json());

			// const json = await response.json()
		} catch (error) {
			console.log(error);
		}

		console.log(email, password);
	};

	return (
		<main className="grid w-full h-full px-4 grow place-items-center">
			<div className="max-w-3xl grid grid-cols-2 max-h-[480px] shadow-2xl w-full h-full rounded-2xl overflow-hidden">
				<div className="grid h-full p-3 px-6 md:mx-12 place-items-center">
					<form
						className="flex flex-col justify-center w-full h-fit"
						onSubmit={(event) => {
							event.preventDefault();
							handleOnSubmit(email, password);
						}}
					>
						<h1 className="w-full mb-4 text-[32px] font-extrabold text-center">
							Sign in
						</h1>
						<label htmlFor="email" className="hidden absolute -left-[9999px]">
							Email
						</label>
						<input
							type="text"
							name="email"
							id="email"
							placeholder="Email"
							className="py-3 px-4 bg-[#EEE] w-full my-2 text-sm"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
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
						<button
							type="submit"
							className="uppercase bg-color1 px-11 py-3 font-[Arial] text-white w-fit mx-auto text-xs rounded-[20px] mt-3 font-bold tracking-wider"
						>
							Sign in
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
