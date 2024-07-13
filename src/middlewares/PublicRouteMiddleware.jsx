import { userStore } from "../store/authStore"
import PropTypes from "prop-types"

export const PublicRouteMiddleware = ({ children }) => {
    const userLogged = userStore.getState().isUserLogged();

    if (userLogged) userStore.getState().deleteUser();

    return children
}

PublicRouteMiddleware.propTypes = {
    children: PropTypes.node.isRequired
}