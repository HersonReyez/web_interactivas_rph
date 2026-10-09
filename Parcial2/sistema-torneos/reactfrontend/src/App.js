import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importar nuestros componentes
import Login from './components/Login';
import ShowTorneos from './components/ShowTorneos';
import CreateTorneo from './components/CreateTorneo';
import EditTorneo from './components/EditTorneo';
import Register from './components/Register';
import MisTorneos from './components/MisTorneos';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <ShowTorneos/> } />
            <Route path='/login' element={ <Login/> } />
            <Route path='/createtorneo' element={ <CreateTorneo/> } />
            <Route path='/edittorneo/:id' element={ <EditTorneo/> } />
            <Route path='/register' element={ <Register/> } />
            <Route path='/mistorneos' element={ <MisTorneos/> } />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
