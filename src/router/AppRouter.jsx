import { Route, Routes } from "react-router-dom"

import { PublicRouteMiddleware } from "../middlewares/PublicRouteMiddleware"
import { AuthRoutes } from "../routes/AuthRoutes"

import { PrivateRouteMiddleware } from "../middlewares/PrivateRouteMiddleware"
import { FitnessTrackerRoutes } from "../routes/FitnessTrackerRoutes"

export const AppRouter = () => {
    return (
        <Routes>

            {/*Auth*/}
            <Route path="/auth/*" element={
                <PublicRouteMiddleware>
                    <AuthRoutes />
                </PublicRouteMiddleware>
            } />

            {/*RUTAS PRINCIPALES*/}
            <Route path="/*" element={
                <PrivateRouteMiddleware>
                    <FitnessTrackerRoutes />
                </PrivateRouteMiddleware>
            } />

        </Routes >
    )
}