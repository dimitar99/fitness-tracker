import { Route, Routes } from "react-router-dom"
import { LoginPage } from "../views/auth/LoginPage"
import { RegisterPage } from "../views/auth/RegisterPage"


export const AuthRoutes = () => {
    return (
        <Routes>

            <Route path="login" element={<LoginPage />} />

            <Route path="register" element={<RegisterPage />} />

        </Routes>
    )
}