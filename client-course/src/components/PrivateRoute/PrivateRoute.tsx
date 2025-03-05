import { useAuth } from "@/hooks/useAuth";
import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";


interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({children}) => {
    const {token, isAuthenticated} = useAuth();
    const location = useLocation();
    if(!isAuthenticated || !token ){
        return <Navigate to="/login" state={location?.pathname} replace={true} />;
    }
    
    return <>{children}</>;
}

export default PrivateRoute