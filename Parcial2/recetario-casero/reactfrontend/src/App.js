import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importar nuestros componentes
import Login from './components/Login';
import Register from './components/Register';
import Recetas from './components/Recetas';
import CreateReceta from './components/CreateReceta';
import EditReceta from './components/EditReceta';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <Login/> } />
            <Route path='/register' element={ <Register/> } />
            <Route path='/recetas' element={ <Recetas/> } />
            <Route path='/create' element={ <CreateReceta/> } />
            <Route path='/edit/:id' element={ <EditReceta/> } />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
