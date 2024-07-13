import './Auth.css'

import { useState } from 'react'
import { authUtil } from '../../utils/auth'
import { userStore } from '../../store/authStore'
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {

    const { login: loginRequest } = authUtil();
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => setIsChecked(!isChecked);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        // Omite las acciones por defecto
        event.preventDefault()

        // Obtener los datos del formulario
        const fields = Object.fromEntries(new window.FormData(event.target))

        // Gestionar Login
        await login(event, fields)
    }

    const login = async (_, fields) => {
        if (fields.email === '' || fields.password === '') {
            return
        }
        try {
            const response = await loginRequest(fields.email, fields.password)
            console.log(response)
            if (response && 'status' in response && response.status === "success") {
                // Resetear valores del formulario
                // resetForm(event);
                userStore.getState().saveUser(response.user)
                navigate("/routines")
            } else {
                alert("error")
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className='login-container'>
            <form onSubmit={handleSubmit}>
                <p className='title'>{"Login"}</p>
                <label htmlFor="email">Email:</label>
                <input className='input' type="text" name="email" id="email" placeholder='user@email.com' />
                <label htmlFor="password">Password:</label>
                <input className='input' type="password" name="password" id="password" placeholder='*****************' />

                <div className='checkBox'>
                    <input type="checkbox" id="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                    <label htmlFor="checkbox">Recordarme</label>
                </div>
                <input className='btn' type="submit" value={"Login"} />
                <p className='btn-link' onClick={() => { }} >{"¿Ya tienes cuenta?"}</p>
            </form>
        </div>
    )
}