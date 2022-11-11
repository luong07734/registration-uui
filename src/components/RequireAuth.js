import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    console.log(auth);

    return (
        auth.user ? <Navigate to="/" state={{ from: location }} replace /> : <Outlet />
    );
}

export default RequireAuth;