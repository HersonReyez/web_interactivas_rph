import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

const endpoint = 'http://127.0.0.1:8000/api/torneos';

function EditTorneo() {
    const [nombre, setNombre] = useState('');
    const [deporte, setDeporte] = useState('');
    const [fecha, setFecha] = useState('');
    const [cupo, setCupo] = useState(16);
    const [descripcion, setDescripcion] = useState('');
    const [estado, setEstado] = useState('abierto');
    const [errores, setErrores] = useState({});
    
    const navigate = useNavigate();
    const { id } = useParams(); // Obtener el ID de la URL

    useEffect(() => {
        const getTorneoById = async () => {
            const response = await axios.get(`${endpoint}/${id}`);
            // Llenar el formulario con los datos actuales
            setNombre(response.data.nombre);
            setDeporte(response.data.deporte);
            setFecha(response.data.fecha);
            setCupo(response.data.cupo);
            setDescripcion(response.data.descripcion || '');
            setEstado(response.data.estado);
        };
        getTorneoById();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const update = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            await axios.put(`${endpoint}/${id}`, {
                nombre, deporte, fecha, cupo, descripcion, estado
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrores(error.response.data.errores || { general: error.response.data.message });
            }
        }
    }

    return (
        <div className='container mt-5'>
            <div className="d-flex justify-content-between mb-4">
                <h2>Editar Torneo</h2>
                <Link to="/" className="btn btn-secondary">Volver</Link>
            </div>

            {errores.general && <div className="alert alert-danger">{errores.general}</div>}

            <form onSubmit={update} className="card p-4 shadow-sm border-warning">
                <div className='mb-3'>
                    <label className='form-label'>Nombre del Torneo</label>
                    <input value={nombre} onChange={(e) => setNombre(e.target.value)} type='text' className='form-control' required />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Juego o Deporte</label>
                    <input value={deporte} onChange={(e) => setDeporte(e.target.value)} type='text' className='form-control' required />
                </div>

                <div className='row'>
                    <div className='col-md-6 mb-3'>
                        <label className='form-label'>Fecha</label>
                        <input value={fecha} onChange={(e) => setFecha(e.target.value)} type='date' className='form-control' required />
                    </div>
                    <div className='col-md-6 mb-3'>
                        <label className='form-label'>Cupo</label>
                        <input value={cupo} onChange={(e) => setCupo(e.target.value)} type='number' min="2" max="100" className='form-control' />
                        {errores.cupo && <small className="text-danger">{errores.cupo[0]}</small>}
                    </div>
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Descripción</label>
                    <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className='form-control' rows="3"></textarea>
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Estado</label>
                    <select value={estado} onChange={(e) => setEstado(e.target.value)} className='form-select'>
                        <option value="abierto">Abierto</option>
                        <option value="cerrado">Cerrado</option>
                    </select>
                </div>

                <button type='submit' className='btn btn-warning'>Actualizar Torneo</button>
            </form>
        </div>
    );
}

export default EditTorneo;