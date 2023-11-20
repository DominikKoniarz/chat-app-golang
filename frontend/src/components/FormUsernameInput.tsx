import React from "react";

type FormUsernameInputProps = {
	username: string;
	setUsername: React.Dispatch<React.SetStateAction<string>>;
};

const FormUsernameInput = ({
	username,
	setUsername,
}: FormUsernameInputProps) => {
	return (
		<>
			<label htmlFor="username" className="hidden absolute -left-[9999px]">
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
		</>
	);
};

export default FormUsernameInput;
