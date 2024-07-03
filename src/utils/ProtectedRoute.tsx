import { FC, ReactNode, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { Navigate } from "react-router-dom";

const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setIsAuthenticated(!!currentUser); 
    });
    return () => unsubscribe(); 
  }, []);

  // Redirect to login if not authenticated, once the auth state is determined (isAuthenticated is not null)
  return isAuthenticated === false ? (
    <Navigate to="/" replace />
  ) : isAuthenticated === true ? (
    children
  ) : null;
};

export default ProtectedRoute;
