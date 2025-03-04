import { useAuth } from "@/hooks/useAuth";
import React, { ReactNode } from "react";
import { Navigate } from "react-router";


interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({children}) => {
    const {token, isAuthenticated} = useAuth();
    
    if(!isAuthenticated || !token ){
        return <Navigate to="/login" />;
    }
    
    return <>{children}</>;
}

export default PrivateRoute