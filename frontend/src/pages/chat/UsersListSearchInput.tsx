import React from "react";

type UsersListSearchInputProps = {
	searchValue: string;
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

const UsersListSearchInput = ({
	searchValue,
	setSearchValue,
}: UsersListSearchInputProps) => {
	return (
		<li className="w-full p-1 fit">
			<input
				type="text"
				name="usersListSearchInput"
				id="usersListSearchInput"
				placeholder="Szukaj..."
				value={searchValue}
				onChange={(event) => setSearchValue(event.target.value)}
				className="w-full p-2 text-sm transition-colors duration-300 border outline-none border-slate-600 text-slate-600 placeholder-slate-700 rounded-2xl focus:placeholder-slate-400"
			/>
		</li>
	);
};

export default UsersListSearchInput;
