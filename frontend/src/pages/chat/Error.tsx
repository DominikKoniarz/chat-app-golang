import { useEffect } from "react";
import { Link } from "react-router-dom";

type ErrorProps = { error: string; deleteToken: () => void; text: string };

const Error = ({ error, deleteToken, text }: ErrorProps) => {
	console.log(error);

	useEffect(() => {
		const timer = setTimeout(() => {
			deleteToken();
		}, 5000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="flex flex-col w-full pt-4 text-center">
			{text}
			<Link to="/login" className="text-red-500">
				Redirect to login page!
			</Link>
		</div>
	);
};

export default Error;
