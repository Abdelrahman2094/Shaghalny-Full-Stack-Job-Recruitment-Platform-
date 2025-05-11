
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const role = localStorage.getItem("role");
  return role === "admin" ? children : <Navigate to="/login" />;
}

export default AdminRoute;