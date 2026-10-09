import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const endpoint = 'http://127.0.0.1:8000/api/register'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const register = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(endpoint, {
                name: name,
                email: email,
                password: password
            })
            
            // 1. Guardamos el token que nos devuelve Laravel al registrar
            localStorage.setItem('token', response.data.access_token)
            localStorage.setItem('role', response.data.data.role); // Guardamos el rol (admin o jugador)
            
            // 2. Redirigir a la vista torneos
            navigate('/')
        } catch (error) {
            console.error("Error al registrar", error)
            alert("Error al crear la cuenta. Verifica que el correo no esté en uso y que la contraseña tenga al menos 8 caracteres.")
        }
    }

  return (
    <div className="container mt-5">
        <h1>Crear Cuenta</h1>
        <form onSubmit={register}>
            <div className='mb-3'>
                <label className='form-label'>Nombre</label>
                <input 
                    value={name} 
                    onChange={(e)=> setName(e.target.value)} 
                    type='text' 
                    className='form-control' 
                    required 
                />
            </div>

            <div className='mb-3'>
                <label className='form-label'>Correo Electrónico</label>
                <input 
                    value={email} 
                    onChange={(e)=> setEmail(e.target.value)} 
                    type='email' 
                    className='form-control' 
                    required 
                />
            </div>

            <div className='mb-3'>
                <label className='form-label'>Contraseña</label>
                {/* Le agregamos minLength="8" para que coincida con la validación de tu backend en Laravel */}
                <input 
                    value={password} 
                    onChange={(e)=> setPassword(e.target.value)} 
                    type='password' 
                    className='form-control' 
                    minLength="8" 
                    required 
                />
            </div>

            <button type='submit' className='btn btn-success'>Registrarse</button>
        </form>
        <br/>
        <div className='d-grid gap-2'>
            <Link to="/login" className='btn btn-primary mt-2 mb-2'>Ya tengo cuenta, iniciar sesión</Link>
        </div>
    </div>
  )
}

export default Register