import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RedirectIfLoggedIn = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" /> : children;
};

export default RedirectIfLoggedIn;
