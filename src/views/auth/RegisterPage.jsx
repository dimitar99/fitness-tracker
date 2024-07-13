import './Auth.css'
import { authUtil } from '../../utils/auth'

import { userStore } from '../../store/authStore'

export const RegisterPage = () => {
    const { register: registerRequest } = authUtil();

    const resetForm = (event) => event.target.reset();

    const handleSubmit = async (event) => {
        // Omite las acciones por defecto
        event.preventDefault()

        // Obtener los datos del formulario
        const fields = Object.fromEntries(new window.FormData(event.target))

        await register(event, fields)
    }

    const register = async (event, fields) => {
        if (fields.name === '' || fields.nick === '' || fields.email === '' || fields.password === '' || fields.confirmPassword === '') {
            return
        }
        try {
            const response = await registerRequest(fields.name, fields.nick, fields.email, fields.password)
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

    return (
        <div className='login-container'>
            <form onSubmit={handleSubmit}>
                <p className='title'>{"Register"}</p>

                <label htmlFor="name">Name:</label>
                <input className='input' type="text" name="name" id="name" placeholder='Pepe Surname' />

                <label htmlFor="nick">Nickname:</label>
                <input className='input' type="text" name="nick" id="nick" placeholder='pepe_example1234' />

                <label htmlFor="email">Email:</label>
                <input className='input' type="text" name="email" id="email" placeholder='user@email.com' />

                <label htmlFor="password">Password:</label>
                <input className='input' type="password" name="password" id="password" placeholder='*****************' />

                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input className='input' type="password" name="confirmPassword" id="confirmPassword" placeholder='*****************' />

                <input className='btn' type="submit" value={"Register"} />
                <p className='btn-link' onClick={() => { }} >{"¿Ya tienes cuenta?"}</p>

            </form>
        </div>
    )
}