import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ROLE_ROUTES } from "../utils/role_Routes.js";

const AuthRedirect = () => {
  const { token, role } = useSelector(state => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

 useEffect(() => {
    if (!token || !role) return;

    // Only redirect if user is on public pages
    const publicRoutes = ["/", "/login", "/register"];

    if (publicRoutes.includes(location.pathname)) {
      navigate(ROLE_ROUTES[role] || "/", { replace: true });
    }
  }, [token, role, location.pathname, navigate]);


  return null;
};

export default AuthRedirect;
