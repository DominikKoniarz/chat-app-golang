type LoggedUserMessageProps = {
	message: string;
};

const LoggedUserMessage = ({ message }: LoggedUserMessageProps) => {
	return (
		<li className="ml-auto w-fit h-fit md:max-w-[80%] lg:max-w-[60%]">
			<div className="px-2.5 py-2 text-sm sm:text-base bg-gray-100 rounded-2xl">
				{message}
			</div>
		</li>
	);
};

export default LoggedUserMessage;
