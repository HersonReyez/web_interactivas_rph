import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const endpoint = 'http://127.0.0.1:8000/api'

function Recetas() {
    const [recetas, setRecetas] = useState([])
    const navigate = useNavigate()

    useEffect ( ()=> {
        getRecetas()
    }, [])

    const getRecetas = async () => {
        // 1. Recuperamos el token
        const token = localStorage.getItem('token')

        // Si no hay token, lo mandamos al login por seguridad
        if(!token){
            navigate('/')
            return
        }

        try {
            // 2. Hacemos el GET enviando el token en los Headers
            const response = await axios.get(`${endpoint}/recetas`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            // 3. En el controlador, cuando NO hay recetas devuelves {"data": []}
            // Pero cuando SÍ hay, devuelves un arreglo directo [ {..}, {..} ]. Validamos esto:
            if (Array.isArray(response.data)) {
                setRecetas(response.data) // Guardamos el arreglo en el estado (corregido de setProducts)
            } else if (response.data.data) {
                setRecetas(response.data.data)
            }
        } catch (error) {
            console.error("Error obteniendo recetas", error)
        }
    }

    // Función para eliminar una receta
    const deleteReceta = async (id) => {
        // Regla 6: Confirmar antes de eliminar
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar esta receta?")
        if(confirmar){
            const token = localStorage.getItem('token')
            try {
                await axios.delete(`${endpoint}/receta/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                alert("¡Receta eliminada con éxito!") // Regla 6: Mensaje de éxito
                getRecetas() // Volvemos a pedir las recetas para actualizar la lista
            } catch (error) {
                console.error("Error al eliminar", error)
            }
        }
    }

    // Función para Cerrar sesión
    const logout = async () => {
        const token = localStorage.getItem('token')
        try {
            // Le decimos al backend que elimine el token
            await axios.get(`${endpoint}/logout`, {
                headers: { Authorization: `Bearer ${token}` }
            })
        } catch (error) {
            console.error("Error en el servidor al cerrar sesión", error)
        }
        // Borramos el token del navegador y redirigimos
        localStorage.removeItem('token')
        navigate('/')
    }
    

  return (
    <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>Mis Recetas</h1>
            <Link to="/create" className='btn btn-success text-white'>Crear nueva receta</Link>
            <button onClick={logout} className='btn btn-secondary'>Cerrar sesión</button>
        </div>

        <div className="row">
            {/* 4. Verificamos si hay recetas. Si no, mostramos un mensaje. */}
            {recetas.length === 0 ? (
                <div className="alert alert-info">No tienes recetas aún.</div>
            ) : (
                /* 5. Iteramos sobre el arreglo de recetas para dibujarlas */
                recetas.map((receta) => (
                    <div className="col-md-4 mb-4" key={receta.id}>
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title text-primary">{receta.titulo}</h5>
                                <h6 className="card-subtitle mb-2 text-muted text-capitalize">
                                    {receta.categoria} - {receta.tiempo} min
                                </h6>
                                <p className="card-text mb-1"><strong>Dificultad:</strong> {receta.dificultad}</p>
                                
                                <p className="card-text">
                                    <strong>Ingredientes:</strong><br/>
                                    {receta.ingrendientes.split('\n').map((linea, index) => (
                                        <span key={index}>- {linea}<br/></span>
                                    ))}
                                </p>
                            </div>
                            <div className="card-footer bg-white border-0">
                                <Link to={`/edit/${receta.id}`} className="btn btn-warning btn-sm me-2">Editar</Link>
                                <button onClick={() => deleteReceta(receta.id)} className="btn btn-danger btn-sm">Eliminar</button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
  )
}

export default Recetas