import { useEffect } from "react";
import { Link } from "react-router-dom";

type AuthErrorProps = { error: string; deleteToken: () => void };

const AuthError = ({ error, deleteToken }: AuthErrorProps) => {
	console.log(error);

	useEffect(() => {
		const timer = setTimeout(() => {
			deleteToken();
		}, 5000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="flex flex-col w-full pt-4 text-center">
			Authentication error!
			<Link to="/login" className="text-red-500">
				Redirect to login page!
			</Link>
		</div>
	);
};

export default AuthError;
