import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const endpoint = 'http://127.0.0.1:8000/api/torneos';

function CreateTorneo() {
    const [nombre, setNombre] = useState('');
    const [deporte, setDeporte] = useState('');
    const [fecha, setFecha] = useState('');
    const [cupo, setCupo] = useState(16);
    const [descripcion, setDescripcion] = useState('');
    const [estado, setEstado] = useState('abierto');
    const [errores, setErrores] = useState({}); // Para guardar errores del backend
    const navigate = useNavigate();

    const store = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            await axios.post(endpoint, {
                nombre, deporte, fecha, cupo, descripcion, estado
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/'); // Redirigir al inicio si todo sale bien
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // Capturar los errores de validación de Laravel
                setErrores(error.response.data.errores || { general: error.response.data.message });
            }
        }
    }

    return (
        <div className='container mt-5'>
            <div className="d-flex justify-content-between mb-4">
                <h2>Crear Nuevo Torneo</h2>
                <Link to="/" className="btn btn-secondary">Volver</Link>
            </div>

            {errores.general && <div className="alert alert-danger">{errores.general}</div>}

            <form onSubmit={store} className="card p-4 shadow-sm">
                <div className='mb-3'>
                    <label className='form-label'>Nombre del Torneo</label>
                    <input value={nombre} onChange={(e) => setNombre(e.target.value)} type='text' className='form-control' required />
                    {errores.nombre && <small className="text-danger">{errores.nombre[0]}</small>}
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Juego o Deporte</label>
                    <input value={deporte} onChange={(e) => setDeporte(e.target.value)} type='text' className='form-control' required />
                    {errores.deporte && <small className="text-danger">{errores.deporte[0]}</small>}
                </div>

                <div className='row'>
                    <div className='col-md-6 mb-3'>
                        <label className='form-label'>Fecha (Futura)</label>
                        <input value={fecha} onChange={(e) => setFecha(e.target.value)} type='date' className='form-control' required />
                        {errores.fecha && <small className="text-danger">{errores.fecha[0]}</small>}
                    </div>
                    <div className='col-md-6 mb-3'>
                        <label className='form-label'>Cupo (2 - 100)</label>
                        <input value={cupo} onChange={(e) => setCupo(e.target.value)} type='number' min="2" max="100" className='form-control' />
                        {errores.cupo && <small className="text-danger">{errores.cupo[0]}</small>}
                    </div>
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Descripción (Opcional)</label>
                    <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className='form-control' rows="3"></textarea>
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Estado</label>
                    <select value={estado} onChange={(e) => setEstado(e.target.value)} className='form-select'>
                        <option value="abierto">Abierto</option>
                        <option value="cerrado">Cerrado</option>
                    </select>
                </div>

                <button type='submit' className='btn btn-success'>Guardar Torneo</button>
            </form>
        </div>
    );
}

export default CreateTorneo;