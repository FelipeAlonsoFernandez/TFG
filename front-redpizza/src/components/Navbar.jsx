import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo_redpizza_webp.webp';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
    };

    return (
        <>
            <div className={`menu-overlay ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}></div>
            <nav className="navbar">
                <div className="menu-icon" onClick={toggleMenu}>
                    ☰
                </div>
                <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/" className="navbar-text" onClick={toggleMenu}>INICIO</Link>
                    <Link to="/carta" className="navbar-text" onClick={toggleMenu}>CARTA</Link>
                    <Link to="/localizacion" className="navbar-text" onClick={toggleMenu}>LOCALIZACIÓN</Link>
                    <Link to="/contacto" className="navbar-text" onClick={toggleMenu}>CONTACTO</Link>
                </div>

                <div className="navbar-left">
                    <Link to="/" className="navbar-text letra-roja">INICIO</Link>
                    <Link to="/carta" className="navbar-text letra-roja">CARTA</Link>
                </div>
                
                <div className="navbar-center">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="navbar-logo" />
                    </Link>
                </div>
                
                <div className="navbar-right">
                    <Link to="/localizacion" className="navbar-text letra-naranja">LOCALIZACIÓN</Link>
                    <Link to="/contacto" className="navbar-text letra-naranja">CONTACTO</Link>
                </div>
            </nav>
        </>
    );
}

export default Navbar;