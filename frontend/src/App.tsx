import { ChangeEvent, useState } from "react";

const socket: WebSocket = new WebSocket("ws://localhost:3000/ws");

// const connect = () => {
// 	socket = new WebSocket("ws://localhost:3000/ws");
// };

socket.onopen = () => {
	console.log("connection established");
};

socket.onmessage = (event: MessageEvent) => {
	console.log("Wiadomość: ", event.data);
};

socket.onclose = () => {
	console.log("connection closed");
};

const sendMessage = (value: string) => {
	if (!value) return;

	socket.send(
		JSON.stringify({
			receiverId: "xdxd",
			messageContent: value,
			event: "privateMessage",
		})
	);
};

function App() {
	const [value, setValue] = useState<string>("");

	return (
		<div>
			<input
				type="text"
				onChange={(event: ChangeEvent<HTMLInputElement>) => {
					setValue(event.target.value);
				}}
				value={value}
			/>
			<button
				onClick={() => {
					sendMessage(value);
				}}
			>
				Kliknij
			</button>
			<button onClick={() => socket.close()}>Close connection</button>
			{/* <button onClick={connect}>Reconnect</button> */}
		</div>
	);
}

export default App;
