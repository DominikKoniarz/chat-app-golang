import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../../constants";
import FormUsernameInput from "@components/FormUsernameInput";
import LoginFormHeader from "./LoginFormHeader";
import FormPasswordInput from "@components/FormPasswordInput";
import FormErrorIndicator from "@components/FormErrorIndicator";
import FormSubmitButton from "@components/FormSubmitButton";

type LoginFormProps = {
	updateToken: (token: string) => void;
};

const LoginForm = ({ updateToken }: LoginFormProps) => {
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

	return (
		<form
			className="flex flex-col justify-center w-full h-fit"
			onSubmit={(event) => {
				event.preventDefault();
				handleOnSubmit(username, password);
			}}
		>
			<LoginFormHeader />
			<FormUsernameInput username={username} setUsername={setUsername} />
			<FormPasswordInput password={password} setPassword={setPassword} />
			<FormErrorIndicator isPending={isPending} errorInfo={loginError} />
			<FormSubmitButton text="Sign in" isPending={isPending} />
		</form>
	);
};

export default LoginForm;
