import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Login from "@pages/login/Login";
import Register from "@pages/register/Register";
import Layout from "@components/Layout";
import { AuthContextProvider } from "@context/AuthContext";

// const socket: WebSocket = new WebSocket("ws://localhost:3000/ws");

// // const connect = () => {
// // 	socket = new WebSocket("ws://localhost:3000/ws");
// // };

// socket.onopen = () => {
// 	console.log("connection established");
// };

// socket.onmessage = (event: MessageEvent) => {
// 	console.log("Wiadomość: ", event.data);
// };

// socket.onclose = () => {
// 	console.log("connection closed");
// };

// const sendMessage = (value: string) => {
// 	if (!value) return;

// 	socket.send(
// 		JSON.stringify({
// 			receiverId: "xdxd",
// 			messageContent: value,
// 			event: "privateMessage",
// 		})
// 	);
// };

// const sendTestJson = async () => {
// 	try {
// 		const response = await fetch("http://localhost:3000/register", {
// 			method: "POST",
// 			body: JSON.stringify({ username: "aa", password: "qwerty123" }),
// 		});

// 		if (!response.ok) {
// 			throw Error(`${response.status}`);
// 		}

// 		console.log(response.status);
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

function App() {
	// const [value, setValue] = useState<string>("");

	return (
		<BrowserRouter>
			<AuthContextProvider>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route path="/" element={<Navigate to="/login" />} />
						<Route index path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />

						<Route path="/chat" element={<ProtectedRoutes />}>
							<Route index element={<div>chat</div>} />
						</Route>

						<Route path="*" element={<div>Not found</div>} />
					</Route>
				</Routes>
			</AuthContextProvider>
		</BrowserRouter>
	);
}

export default App;
