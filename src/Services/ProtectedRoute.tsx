import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
   children: React.ReactNode;
   allowedRoles: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
   const token = useSelector((state: any) => state.jwt)
   if (!token) {
      return <Navigate to="/login" />
   }
   const decodedToken: any = jwtDecode(token)
   if (allowedRoles && !allowedRoles.includes(decodedToken.applicantType)) {
      return <Navigate to="/" />
   }
   return children
}



