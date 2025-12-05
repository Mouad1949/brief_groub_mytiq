import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { RoleContext } from "../context/RoleContext";

export default function ProtectedRoute({ children, allowedRole }) {
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);
  const { role, setRole } = useContext(RoleContext);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    axios
      .get("http://127.0.0.1:8000/api/verify-token", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        if (response.data.valid) {
          setValid(true);
          setRole(response.data.role);
          localStorage.setItem("user_role", response.data.role);
        }
      })
      .catch(() => {
        setValid(false);
        localStorage.removeItem("auth_token");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Checking authentication...</p>;
  if (!valid) return <Navigate to="/login" replace />;

  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
}
