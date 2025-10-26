import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loadingUser } = useContext(AppContext);

  if (loadingUser) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

export default ProtectedRoute;
