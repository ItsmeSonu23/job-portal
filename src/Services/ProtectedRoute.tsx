import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
   children: React.ReactNode;
   allowedRoles: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
   const token = useSelector((state: any) => state.jwt);
   const isLoggedIn = !!token; // Check if the user is logged in
   const decodedToken: any = token ? jwtDecode(token) : null;

   if (!isLoggedIn) {
      return <Navigate to="/login" />;
   }

   if (allowedRoles && decodedToken && !allowedRoles.includes(decodedToken.applicantType)) {
      return <Navigate to="/" />;
   }
   return children
}



