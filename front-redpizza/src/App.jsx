import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Principal from './components/Principal';
import Carta from './components/Carta';
import Localizacion from './components/Localizacion';
import Contacto from './components/Contacto';

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={"/inicio"} />} />
        <Route path='/inicio'element={<Principal />} />
        <Route path="/carta" element={<Carta />} />
        <Route path="/localizacion" element={<Localizacion />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
