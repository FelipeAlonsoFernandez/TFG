import React from 'react'
import FotoCarta from '../assets/inicio_carta.webp'
import FotoOfertas from '../assets/inicio_ofertas.webp'
import './Principal.css'

function Principal() {
    return (
        <div className="principal-container">
            <div className="images-container">
                <div className="image-wrapper">
                    <img src={FotoCarta} alt="Carta" />
                    <div className="image-overlay">
                        <h2>Nuestra Carta</h2>
                    </div>
                </div>
                <div className="image-wrapper">
                    <img src={FotoOfertas} alt="Ofertas" />
                    <div className="image-overlay">
                        <h2>Ofertas</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Principal