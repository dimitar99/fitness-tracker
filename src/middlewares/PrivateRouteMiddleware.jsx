import { Navigate, useLocation } from "react-router-dom";
import { userStore } from "../store/authStore"
import PropTypes from "prop-types"

export const PrivateRouteMiddleware = ({ children }) => {
    const userLogged = userStore.getState().isUserLogged();

    const { pathname } = useLocation();

    console.log(`path ${pathname} userLogged ${userLogged}`);

    return userLogged ? children : <Navigate to={"/auth/login"} />
}

PrivateRouteMiddleware.propTypes = {
    children: PropTypes.node.isRequired
}