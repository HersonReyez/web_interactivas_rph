import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const endpoint = 'http://127.0.0.1:8000/api/receta'

function CreateReceta() {
    const [titulo, setTitulo] = useState('')
    const [categoria, setCategoria] = useState('almuerzo')
    const [tiempo, setTiempo] = useState('')
    const [dificultad, setDificultad] = useState('media')
    const [ingrendientes, setIngredientes] = useState('')
    const [pasos, setPasos] = useState('')
    const [nota, setNota] = useState('')
    
    const navigate = useNavigate()

    const store = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        
        try {
            await axios.post(endpoint, {
                titulo: titulo,
                categoria: categoria,
                tiempo: tiempo,
                dificultad: dificultad,
                ingrendientes: ingrendientes, // Con la 'n' de tu base de datos
                pasos: pasos,
                nota: nota
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            
            alert("¡Receta creada con éxito!") // Regla 6
            navigate('/recetas')
        } catch (error) {
            console.error("Error al crear la receta", error)
            alert("Ocurrió un error al guardar la receta. Revisa los datos.")
        }
    }

  return (
    <div className='container mt-5'>
        <h3>Crear Nueva Receta</h3>
        <form onSubmit={store}>
            <div className='mb-3'>
                <label className='form-label'>Título (Obligatorio)</label>
                <input value={titulo} onChange={(e)=> setTitulo(e.target.value)} type='text' className='form-control' required />
            </div>

            <div className='row'>
                <div className='col-md-4 mb-3'>
                    <label className='form-label'>Categoría (Obligatorio)</label>
                    <select value={categoria} onChange={(e)=> setCategoria(e.target.value)} className='form-select' required>
                        <option value="desayuno">Desayuno</option>
                        <option value="almuerzo">Almuerzo</option>
                        <option value="cena">Cena</option>
                        <option value="postre">Postre</option>
                        <option value="bebida">Bebida</option>
                    </select>
                </div>
                <div className='col-md-4 mb-3'>
                    <label className='form-label'>Tiempo (minutos, mayor a 0)</label>
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
                <label className='form-label'>Ingredientes (Uno por línea)</label>
                <textarea value={ingrendientes} onChange={(e)=> setIngredientes(e.target.value)} className='form-control' rows="4" required />
            </div>

            <div className='mb-3'>
                <label className='form-label'>Pasos de Preparación (Uno por línea)</label>
                <textarea value={pasos} onChange={(e)=> setPasos(e.target.value)} className='form-control' rows="4" required />
            </div>

            <div className='mb-3'>
                <label className='form-label'>Nota Personal (Opcional)</label>
                <textarea value={nota} onChange={(e)=> setNota(e.target.value)} className='form-control' rows="2" />
            </div>

            <button type='submit' className='btn btn-primary me-2'>Guardar</button>
            <Link to="/recetas" className='btn btn-secondary'>Cancelar</Link>
        </form>
    </div>
  )
}

export default CreateReceta