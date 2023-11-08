import { Navigate, Outlet } from "react-router-dom";

type Props = {
	token: null | string;
};

const ProtectedRoutes = ({ token }: Props) => {
	return !token ? <Navigate to="/login" /> : <Outlet />;
};

export default ProtectedRoutes;
