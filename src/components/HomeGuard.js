import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const HomeGuard = () => {
    const { auth } = useAuth();
    const location = useLocation();

    console.log(auth);

    return (
        auth.user ? <Outlet /> : <Navigate to="/signin" state={{ from: location }} replace /> 
    );
}

export default HomeGuard;