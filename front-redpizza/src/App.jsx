import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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
import NuevoProducto from './components/NuevoProducto';
import EditarProducto from './components/EditarProducto';
import Localizacion from './components/Localizacion';
import Contacto from './components/Contacto';
import Login from './components/Login';
import { UserProvider } from "./context/UserContext";


function App() {

  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to={"/inicio"} />} />
          <Route path='/inicio'element={<Principal />} />
          <Route path="/carta" element={<Carta />} />
          <Route path="/productos/nuevo_producto" element={<NuevoProducto />} />
          <Route path="/productos/:id" element={<EditarProducto />} />
          <Route path="/localizacion" element={<Localizacion />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login-panel-admin" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  )
}

export default App
