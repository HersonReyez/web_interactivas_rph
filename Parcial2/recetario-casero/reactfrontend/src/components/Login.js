import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const endpoint = 'http://127.0.0.1:8000/api/login'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const login = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(endpoint, {email: email, password: password})
            
            // 1. Guardamos el token en el navegador
            localStorage.setItem('token', response.data.access_token)
            
            // 2. Redirigimos a la vista de recetas
            navigate('/recetas')
        } catch (error) {
            console.error("Error al iniciar sesión", error)
            alert("Credenciales incorrectas")
        }
    }

  return (
    <div onSubmit={login} className="container mt-5">
        <h1>Iniciar Sesión</h1>
        <form>
            <div className='mb-3'>
                <label className='form-label'>Correo</label>
                <input value={email} onChange={(e)=> setEmail(e.target.value)} type='text' className='form-control'/>
            </div>

            <div className='mb-3'>
                <label className='form-label'>Contraseña</label>
                <input value={password} onChange={(e)=> setPassword(e.target.value)} type='text' className='form-control'/>
            </div>

            <button type='submit' className='btn btn-primary btn-lg mt-2 mb-2 text-white'>Iniciar sesión</button>
        </form>
        <div>
            <Link to="/register" className='btn btn-success btn-lg mt-2 mb-2 text-white'>Crear cuenta</Link>
        </div>
    </div>
  )
}

export default Login