
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormularioDeEdicao from './pages/FormularioDeEdicao';
import ListaClientes from './pages/ListaClientes';
import FormularioDeAdicao from './pages/FormularioDeAdicao';

export default function App() {

  return(
    <Router>
            <Routes>
                <Route path="/" element={<ListaClientes />} />
                <Route path="/editar-cliente/:id" element={<FormularioDeEdicao/>} />
                <Route path="/adicionar" element={<FormularioDeAdicao />} />

            </Routes>
        </Router>
  )
  
}

