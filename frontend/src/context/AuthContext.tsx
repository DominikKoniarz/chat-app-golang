import { createContext, ReactElement, useEffect, useState } from "react";
import { LOCAL_STORAGE_TOKEN_KEY_NAME } from "../constants";

type ChildrenType = {
	children: ReactElement | undefined;
};

type AuthContextType = {
	token: string | null;
	updateToken: (token: string) => void;
	deleteToken: () => void;
	isTokenPreloaded: boolean;
	isAuthenticated: () => boolean;
};

const initialAuthContextState: AuthContextType = {
	token: "",
	updateToken: () => {},
	deleteToken: () => {},
	isTokenPreloaded: false,
	isAuthenticated: () => false,
};

const AuthContext = createContext<AuthContextType>(initialAuthContextState);

export const AuthContextProvider = ({
	children,
}: ChildrenType): ReactElement => {
	const [token, setToken] = useState<string | null>(null);
	const [isTokenPreloaded, setIsTokenPreloaded] = useState<boolean>(false);

	useEffect(() => {
		const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY_NAME);

		setToken(token);
		setIsTokenPreloaded(true);
	}, []);

	const updateToken = (token: string) => {
		setToken(token);
		localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY_NAME, token);
	};

	const deleteToken = (): void => {
		setToken(null);
		localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY_NAME);
	};

	const isAuthenticated = (): boolean => {
		return token ? true : false;
	};

	return (
		<AuthContext.Provider
			value={{
				token,
				updateToken,
				deleteToken,
				isTokenPreloaded,
				isAuthenticated,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
