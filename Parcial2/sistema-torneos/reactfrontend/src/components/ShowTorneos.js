import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const endpoint = 'http://127.0.0.1:8000/api/torneos';

function ShowTorneos() {
    const [torneos, setTorneos] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [inscritos, setInscritos] = useState([]);
    const navigate = useNavigate();

    // Comprobar si el usuario está logueado
    const isLogged = !!localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    useEffect(() => {
        getAllTorneos();
        // Si es jugador, cargamos la lista de torneos a los que ya está inscrito
        if (isLogged && userRole === 'jugador') {
            getMisInscripciones();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogged, userRole]); // <-- Dependencias agregadas

    // <-- NUEVA FUNCIÓN -->
    const getMisInscripciones = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://127.0.0.1:8000/api/mistorneos', {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Extraemos solo los IDs de los torneos y los guardamos en el estado
            const idsInscritos = response.data.map(inscripcion => inscripcion.torneo_id);
            setInscritos(idsInscritos);
        } catch (error) {
            console.error("Error al obtener inscripciones", error);
        }
    };

    // Funcion para mostrar torneos
    const getAllTorneos = async () => {
        try {
            const token = localStorage.getItem('token');
            // Si hay token, lo mandamos en los headers. Si no, lo mandamos vacío.
            const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

            const response = await axios.get(endpoint, config);
            setTorneos(response.data);
            setMensaje('');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setMensaje("No hay torneos disponibles en este momento.");
                setTorneos([]);
            } else {
                console.error("Error al obtener los torneos", error);
            }
        }
    };

    // Funcion para cerrar sesion
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    // Funcion para eliminar torneo 
    const deleteTorneo = async (id) => {
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este torneo?")
        if (confirmar) {
            const token = localStorage.getItem('token')
            try {
                await axios.delete(`${endpoint}/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                alert("¡Torneo eliminada con éxito!")
                getAllTorneos();
            } catch (error) {
                console.error("Error al eliminar", error)
            }
        }
    }

    // Inscribir Jugador
    const inscribirTorneo = async (id) => {
        const token = localStorage.getItem('token');
        try {
            // El segundo parámetro es el body (vacío en este caso), el tercero son los headers
            const response = await axios.post(`${endpoint}/${id}/inscribir`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert(response.data.message); // Muestra "Inscripción exitosa"
            setInscritos(prevInscritos => [...prevInscritos, id]);
            getAllTorneos(); // Refresca la lista para actualizar los cupos visualmente
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.message); // Muestra "Ya estás inscrito", "Lleno", etc.
            } else {
                console.error("Error al inscribir", error);
            }
        }
    }

    return (
        <div className='container mt-5'>
            {/* Barra de Navegación Superior */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Torneos Disponibles</h2>
                <div>
                    {!isLogged ? (
                        <Link to="/login" className="btn btn-outline-primary">Iniciar Sesión / Registro</Link>
                    ) : (
                        <>
                            {userRole === 'jugador' && (
                                <Link to="/mistorneos" className="btn btn-info me-2 text-white">Mis Torneos</Link>
                            )}
                            {userRole === 'admin' && (
                                <Link to="/createtorneo" className="btn btn-warning me-2">Crear torneo</Link>
                            )}
                            <button onClick={handleLogout} className="btn btn-danger">Cerrar Sesión</button>
                        </>
                    )}
                </div>
            </div>

            {/* Mensaje de 404 o Lista de Torneos */}
            {mensaje ? (
                <div className="alert alert-info">{mensaje}</div>
            ) : (
                <div className='row'>
                    {torneos.map((torneo) => (
                        <div className='col-md-4 mb-4' key={torneo.id}>
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title text-primary">{torneo.nombre}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{torneo.deporte}</h6>
                                    <p className="card-text">{torneo.descripcion}</p>
                                    <ul className="list-unstyled">
                                        <li><strong>Fecha:</strong> {torneo.fecha}</li>
                                        <li><strong>Cupo:</strong> {torneo.cupo}</li>
                                        <li><strong>Inscritos:</strong> {(torneo.inscripcions_count || 0)}/{torneo.cupo}</li>
                                        <li><strong>Estado:</strong> {torneo.estado}</li>
                                    </ul>

                                    {isLogged && userRole === 'jugador' ? (
                                        // Comprobamos si el id del torneo está en el estado 'inscritos'
                                        inscritos.includes(torneo.id) ? (
                                            <button className="btn btn-secondary w-100" disabled>Ya inscrito</button>
                                        ) : (
                                            <button onClick={() => inscribirTorneo(torneo.id)} className="btn btn-success w-100">Inscribirme</button>
                                        )
                                    ) : !isLogged ? (
                                        <Link to="/login" className="btn btn-outline-success w-100">Inicia sesión para inscribirte</Link>
                                    ) : null}

                                    {isLogged && userRole === 'admin' ? (
                                        <Link to={`/edittorneo/${torneo.id}`} className="btn btn-warning btn-sm me-2">Editar</Link>
                                    ) : null}

                                    {isLogged && userRole === 'admin' ? (
                                        <button onClick={() => deleteTorneo(torneo.id)} className='btn btn-danger'>Delete</button>
                                    ) : null}

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ShowTorneos;