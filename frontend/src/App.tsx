import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@pages/login/LoginPage";
import RegisterPage from "@pages/register/RegisterPage";
import Layout from "@components/Layout";
import { AuthContextProvider } from "@context/AuthContext";
import ChatPage from "@pages/chat/ChatPage";
import ChatMessagesList from "@pages/chat/ChatMessagesList";

function App() {
	return (
		<BrowserRouter>
			<AuthContextProvider>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route path="/" element={<Navigate to="/login" />} />
						<Route index path="/login" element={<LoginPage />} />
						<Route path="/register" element={<RegisterPage />} />

						<Route path="/chat" element={<ChatPage />}>
							<Route
								index
								path="/chat/:userID?"
								element={<ChatMessagesList />}
							/>
						</Route>

						<Route path="*" element={<div>Not found</div>} />
					</Route>
				</Routes>
			</AuthContextProvider>
		</BrowserRouter>
	);
}

export default App;
