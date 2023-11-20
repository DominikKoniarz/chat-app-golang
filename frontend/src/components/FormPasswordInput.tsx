type FormPasswordInputProps = {
	password: string;
	setPassword: React.Dispatch<React.SetStateAction<string>>;
};

const FormPasswordInput = ({
	password,
	setPassword,
}: FormPasswordInputProps) => {
	return (
		<>
			<label htmlFor="password" className="hidden absolute -left-[9999px]">
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
		</>
	);
};

export default FormPasswordInput;
