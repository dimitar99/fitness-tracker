import { Button } from '@mui/material';
import '../../home/Home.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { userStore } from '../../../store/authStore';

export const NavBar = () => {

    const navigate = useNavigate()

    const logout = () => {
        userStore.getState().deleteUser();
        navigate("/auth/login");
    }

    return (
        <div className='home-container'>

            <div className='home-menu'>

                <NavLink to="/routines">Rutinas</NavLink>
                <NavLink to="/exercises">Exercises</NavLink>
                <NavLink to="/diet">Dieta</NavLink>
                <NavLink to="/food">Food</NavLink>
                <Button onClick={() => logout()}>Logout</Button>
            </div>
        </div>
    )
}