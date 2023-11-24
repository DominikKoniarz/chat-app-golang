import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa6";

const MessageForm = () => {
	const [inputMessageValue, setInputMessageValue] = useState<string>("");

	return (
		<form
			name="sendMessageForm"
			id="sendMessageForm"
			className="flex flex-row w-full gap-3 p-3 shrink-0"
			onSubmit={(event) => {
				event.preventDefault();
			}}
		>
			<input
				value={inputMessageValue}
				onChange={(event) => setInputMessageValue(event.target.value)}
				type="text"
				placeholder="Aa"
				className="w-full p-2 text-sm transition-all duration-300 border outline-none placeholder-slate-700 rounded-2xl focus:placeholder-slate-400 border-slate-100 bg-slate-100 text-slate-900"
			/>

			<button
				type="submit"
				className={`transition-all duration-300 p-1 ${
					inputMessageValue.length ? "block" : "hidden"
				}`}
			>
				<FaPaperPlane />
			</button>
		</form>
	);
};

export default MessageForm;
