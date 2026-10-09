import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams, Link } from 'react-router-dom'

const endpoint = 'http://127.0.0.1:8000/api/receta/'

function EditReceta() {
    const [titulo, setTitulo] = useState('')
    const [categoria, setCategoria] = useState('')
    const [tiempo, setTiempo] = useState('')
    const [dificultad, setDificultad] = useState('')
    const [ingrendientes, setIngredientes] = useState('')
    const [pasos, setPasos] = useState('')
    const [nota, setNota] = useState('')
    
    const navigate = useNavigate()
    const { id } = useParams() // Obtenemos el ID de la URL

    useEffect(() => {
        getRecetaById()
        // eslint-disable-next-line
    }, [])

    const getRecetaById = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await axios.get(`${endpoint}${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            // Llenamos el formulario con los datos de la base de datos
            setTitulo(response.data.titulo)
            setCategoria(response.data.categoria)
            setTiempo(response.data.tiempo)
            setDificultad(response.data.dificultad)
            setIngredientes(response.data.ingrendientes)
            setPasos(response.data.pasos)
            setNota(response.data.nota || '') // Si viene null, ponemos vacío
        } catch (error) {
            console.error("Error al obtener datos", error)
            navigate('/recetas') // Si inventa un ID que no es suyo, lo devolvemos
        }
    }

    const update = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        try {
            await axios.put(`${endpoint}${id}`, {
                titulo: titulo,
                categoria: categoria,
                tiempo: tiempo,
                dificultad: dificultad,
                ingrendientes: ingrendientes,
                pasos: pasos,
                nota: nota
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            alert("¡Receta actualizada con éxito!") // Regla 6
            navigate('/recetas')
        } catch (error) {
            console.error("Error al actualizar la receta", error)
            alert("Error al guardar cambios.")
        }
    }

  return (
    <div className='container mt-5'>
        <h3>Editar Receta</h3>
        <form onSubmit={update}>
            {/* Los mismos campos que en CreateReceta... */}
            <div className='mb-3'>
                <label className='form-label'>Título (Obligatorio)</label>
                <input value={titulo} onChange={(e)=> setTitulo(e.target.value)} type='text' className='form-control' required />
            </div>

            <div className='row'>
                <div className='col-md-4 mb-3'>
                    <label className='form-label'>Categoría</label>
                    <select value={categoria} onChange={(e)=> setCategoria(e.target.value)} className='form-select' required>
                        <option value="desayuno">Desayuno</option>
                        <option value="almuerzo">Almuerzo</option>
                        <option value="cena">Cena</option>
                        <option value="postre">Postre</option>
                        <option value="bebida">Bebida</option>
                    </select>
                </div>
                <div className='col-md-4 mb-3'>
                    <label className='form-label'>Tiempo (minutos)</label>
                    <input value={tiempo} onChange={(e)=> setTiempo(e.target.value)} type='number' min="1" className='form-control' required />
                </div>
                <div className='col-md-4 mb-3'>
                    <label className='form-label'>Dificultad</label>
                    <select value={dificultad} onChange={(e)=> setDificultad(e.target.value)} className='form-select' required>
                        <option value="facil">Fácil</option>
                        <option value="media">Media</option>
                        <option value="dificil">Difícil</option>
                    </select>
                </div>
            </div>

            <div className='mb-3'>
                <label className='form-label'>Ingredientes</label>
                <textarea value={ingrendientes} onChange={(e)=> setIngredientes(e.target.value)} className='form-control' rows="4" required />
            </div>

            <div className='mb-3'>
                <label className='form-label'>Pasos de Preparación</label>
                <textarea value={pasos} onChange={(e)=> setPasos(e.target.value)} className='form-control' rows="4" required />
            </div>

            <div className='mb-3'>
                <label className='form-label'>Nota Personal</label>
                <textarea value={nota} onChange={(e)=> setNota(e.target.value)} className='form-control' rows="2" />
            </div>

            <button type='submit' className='btn btn-warning me-2'>Actualizar Cambios</button>
            <Link to="/recetas" className='btn btn-secondary'>Cancelar</Link>
        </form>
    </div>
  )
}

export default EditReceta