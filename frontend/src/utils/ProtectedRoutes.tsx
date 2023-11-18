import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "@context/AuthContext";

const ProtectedRoutes = () => {
	const { token } = useContext(AuthContext);

	return !token ? <Navigate to="/login" /> : <Outlet />;
};

export default ProtectedRoutes;
