import { useState } from "react";
import registerNewUser from "./registerNewUser";
import RegisterFormHeader from "./RegisterFormHeader";
import FormUsernameInput from "@components/FormUsernameInput";
import FormPasswordInput from "@components/FormPasswordInput";
import FormErrorIndicator from "@components/FormErrorIndicator";
import FormSubmitButton from "@components/FormSubmitButton";

const RegisterForm = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isPending, setIsPending] = useState<boolean>(false);
	const [registerStatus, setRegisterStatus] = useState<string>("");

	const handleOnSubmit = async (username: string, password: string) => {
		setRegisterStatus("");
		if (!username || !password) return;

		setIsPending(true);

		const registerStatus = await registerNewUser(username, password);
		setRegisterStatus(registerStatus);

		setIsPending(false);

		setUsername("");
		setPassword("");
	};

	return (
		<form
			className="flex flex-col justify-center w-full h-fit"
			onSubmit={(event) => {
				event.preventDefault();
				handleOnSubmit(username, password);
			}}
		>
			<RegisterFormHeader />
			<FormUsernameInput username={username} setUsername={setUsername} />
			<FormPasswordInput password={password} setPassword={setPassword} />
			<FormErrorIndicator errorInfo={registerStatus} isPending={isPending} />
			<FormSubmitButton text="Sign up" isPending={isPending} />
		</form>
	);
};

export default RegisterForm;
