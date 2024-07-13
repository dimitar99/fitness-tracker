import { Route, Routes } from "react-router-dom"
import { CalendarioRutinas } from "../views/home/rutinas/CalendarioRutinas"
import { Exercises } from "../views/home/exercises/Exercises"
import { Dieta } from "../views/home/dieta/Dieta"
import { Food } from "../views/home/food/Food"
import { Navigate } from "react-router-dom"
import { NavBar } from '../views/home/components/NavBar'



export const FitnessTrackerRoutes = () => {
    return (
        <>
            <NavBar />

            <Routes>

                <Route path="routines" element={<CalendarioRutinas />} />

                <Route path="exercises" element={<Exercises />} />

                <Route path="diet" element={<Dieta />} />

                <Route path="food" element={<Food />} />

                <Route path="/*" element={<Navigate to="/routines" />} />

            </Routes>
        </>
    )
}