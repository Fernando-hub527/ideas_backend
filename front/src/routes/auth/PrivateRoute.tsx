import { Navigate } from "react-router";
import { getCookie } from "../../utils/cookies";
import routesConfig from "../routesConfig";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const cookie = getCookie('user')
    if (cookie == null){ 
        return <Navigate to={routesConfig.login}/>
    }
    
    return <>{children}</>;
};  
