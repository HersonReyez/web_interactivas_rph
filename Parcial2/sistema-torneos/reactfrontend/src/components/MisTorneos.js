import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const endpoint = 'http://127.0.0.1:8000/api';

function MisTorneos() {
    const [inscripciones, setInscripciones] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        getMisTorneos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getMisTorneos = async () => {
        try {
            const response = await axios.get(`${endpoint}/mistorneos`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setInscripciones(response.data);
        } catch (error) {
            console.error("Error al obtener mis torneos", error);
        }
    };

    const cancelarInscripcion = async (torneoId) => {
        const confirmar = window.confirm("¿Estás seguro de cancelar tu inscripción? Liberarás tu plaza.");
        if (confirmar) {
            try {
                const response = await axios.delete(`${endpoint}/torneos/${torneoId}/cancelar`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert(response.data.message);
                getMisTorneos(); // Refrescar la lista
            } catch (error) {
                if (error.response && error.response.data) {
                    alert(error.response.data.message); // Ejemplo: "Ya no puedes cancelar..."
                }
            }
        }
    };

    return (
        <div className='container mt-5'>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Mis Torneos</h2>
                <Link to="/" className="btn btn-secondary">Regresar a Inicio</Link>
            </div>

            {inscripciones.length === 0 ? (
                <div className="alert alert-info">Aún no estás inscrito en ningún torneo.</div>
            ) : (
                <div className='row'>
                    {inscripciones.map((inscripcion) => (
                        <div className='col-md-4 mb-4' key={inscripcion.id}>
                            <div className="card h-100 shadow-sm border-info">
                                <div className="card-body">
                                    <h5 className="card-title text-info">{inscripcion.torneo.nombre}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{inscripcion.torneo.deporte}</h6>
                                    <ul className="list-unstyled mt-3">
                                        <li><strong>Fecha del Evento:</strong> {inscripcion.torneo.fecha}</li>
                                        <li><strong>Tu fecha de registro:</strong> {new Date(inscripcion.created_at).toLocaleDateString()}</li>
                                    </ul>
                                    
                                    <button 
                                        onClick={() => cancelarInscripcion(inscripcion.torneo_id)} 
                                        className="btn btn-danger w-100 mt-2"
                                    >
                                        Cancelar Inscripción
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MisTorneos;