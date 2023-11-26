import { createContext, ReactElement, useEffect, useState } from "react";
import { LOCAL_STORAGE_TOKEN_KEY_NAME, REFRESH_TOKEN_URL } from "../constants";

type ChildrenType = {
	children: ReactElement | undefined;
};

type AuthContextType = {
	token: string | null;
	updateToken: (token: string) => void;
	deleteToken: () => void;
	isTokenPreloaded: boolean;
	isAuthenticated: () => boolean;
	regenerateToken: (cb: () => void) => void;
};

const initialAuthContextState: AuthContextType = {
	token: "",
	updateToken: () => {},
	deleteToken: () => {},
	isTokenPreloaded: false,
	isAuthenticated: () => false,
	regenerateToken: async () => {},
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

	const regenerateToken = async (cb: () => void) => {
		try {
			const response = await fetch(REFRESH_TOKEN_URL, {
				method: "GET",
				credentials: "include",
				mode: "cors",
			});

			if (!response.ok) {
				throw new Error(`${response.status}`);
			}

			const json = await response.json();
			let token: string = "";

			if (json.accessToken) {
				token = json.accessToken as string;
				updateToken(token);
			} else {
				throw new Error("Invalid json format!");
			}
		} catch (error: Error | unknown) {
			if (error instanceof Error) {
				if (error.message === "401") {
					deleteToken();
				} else {
					deleteToken();
					console.log("Refreshing token error: ", error.message);
				}
			}
		} finally {
			cb();
		}
	};

	return (
		<AuthContext.Provider
			value={{
				token,
				updateToken,
				deleteToken,
				isTokenPreloaded,
				isAuthenticated,
				regenerateToken,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
