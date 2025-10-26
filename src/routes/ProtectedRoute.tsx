import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isActive, setIsActive] = useState<boolean | null>(null); // null = loading

  useEffect(() => {
    const session = localStorage.getItem("kendall_manager_pro_session");
    const expiry = localStorage.getItem("kendall_manager_pro_session_expiry");

    if (!session || !expiry || Date.now() > Number(expiry)) {
      // Remove expired session
      localStorage.removeItem("kendall_manager_pro_session");
      localStorage.removeItem("kendall_manager_pro_session_expiry");

      toast.error("Your session has expired — please log in again.");
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, []);

  if (isActive === null) {
    return null;
  }

  if (!isActive) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
