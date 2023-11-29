type OtherUserMessageProps = {
	message: string;
	username: string;
};

const OtherUserMessage = ({ message, username }: OtherUserMessageProps) => {
	return (
		<li className="mr-auto w-fit h-fit md:max-w-[80%] lg:max-w-[60%]">
			<span className="block mb-1 ml-2.5 text-sm">{username}</span>
			<div className="px-2.5 py-2 text-sm sm:text-base bg-gray-100 rounded-2xl">
				{message}
			</div>
		</li>
	);
};

export default OtherUserMessage;
