import './Auth.css'

import { useState } from 'react'

import { authUtil } from '../../utils/auth'

export const Auth = () => {

    const [isLogin, setIsLogin] = useState(true);

    const { login: loginRequest, register: registerRequest } = authUtil();
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => setIsChecked(!isChecked);

    const resetForm = (event) => event.target.reset();

    const handleSubmit = async (event) => {
        // Omite las acciones por defecto
        event.preventDefault()

        // Obtener los datos del formulario
        const fields = Object.fromEntries(new window.FormData(event.target))

        // Gestionar Login
        if (isLogin) {
            await login(event, fields)
        }
        // Gestionar Registro
        else {
            await register(event, fields)
        }
    }

    const login = async (event, fields) => {
        if (fields.email === '' || fields.password === '') {
            return
        }
        try {
            const response = await loginRequest(fields.email, fields.password)
            console.log(response)
            if (response && 'status' in response && response.status === "success") {
                // Resetear valores del formulario
                resetForm(event);
            } else {
                alert("error")
            }
        } catch (error) {
            alert(error)
        }
    }

    const register = async (event, fields) => {
        console.log(fields)
        if (fields.name === '' || fields.nick === '' || fields.email === '' || fields.password === '' || fields.confirmPassword === '') {
            return
        }
        try {
            const response = await registerRequest(fields.name, fields.nick, fields.email, fields.password)
            console.log(response)
            if (response && 'status' in response && response.status === "success") {
                setIsLogin(true)
                // Resetear valores del formulario
                resetForm(event);
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
                <p className='title'>{isLogin ? "Login" : "Register"}</p>
                {!isLogin &&
                    <>
                        <label htmlFor="name">Name:</label>
                        <input className='input' type="text" name="name" id="name" placeholder='Pepe Surname' />
                    </>}
                {!isLogin &&
                    <>
                        <label htmlFor="nick">Nickname:</label>
                        <input className='input' type="text" name="nick" id="nick" placeholder='pepe_example1234' />
                    </>}
                <label htmlFor="email">Email:</label>
                <input className='input' type="text" name="email" id="email" placeholder='user@email.com' />
                <label htmlFor="password">Password:</label>
                <input className='input' type="password" name="password" id="password" placeholder='*****************' />
                {!isLogin &&
                    <>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input className='input' type="password" name="confirmPassword" id="confirmPassword" placeholder='*****************' />
                    </>}

                <div className='checkBox'>
                    <input type="checkbox" id="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                    <label htmlFor="checkbox">Recordarme</label>
                </div>
                <input className='btn' type="submit" value={isLogin ? "Login" : "Register"} />
                <p className='btn-link' onClick={() => setIsLogin(!isLogin)} >{isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}</p>
            </form>
        </div>
    )
}