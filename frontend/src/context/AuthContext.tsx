import { createContext, ReactElement, useEffect, useState } from "react";
import { LOCAL_STORAGE_TOKEN_KEY_NAME } from "../constants";

type ChildrenType = {
	children: ReactElement | undefined;
};

type TokenType = string | null;

type AuthContextType = {
	token: TokenType;
	updateToken: (token: TokenType) => void;
};

const initialAuthContextState: AuthContextType = {
	token: "",
	updateToken: () => {},
};

const AuthContext = createContext<AuthContextType>(initialAuthContextState);

export const AuthContextProvider = ({
	children,
}: ChildrenType): ReactElement => {
	const [token, setToken] = useState<TokenType>(null);

	useEffect(() => {
		const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY_NAME);

		setToken(token);
	}, []);

	const updateToken = (token: TokenType) => {
		setToken(token);
	};

	return (
		<AuthContext.Provider value={{ token, updateToken }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
