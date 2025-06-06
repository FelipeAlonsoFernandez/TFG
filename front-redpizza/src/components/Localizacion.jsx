import React from 'react'
import LogoJustEat from '../assets/Just_Eat.png'
import LogoRedPizza from '../assets/logo_redpizza_webp.webp';
import './Localizacion.css';

const Localizacion = () => {
    return (
        <>
            <div className="hero-section-localizacion">
                <div className="hero-content">
                    <img src={LogoRedPizza} alt="RedPizza Logo" className="hero-logo" />
                    <h2>¡somos la pizza!</h2>
                    <h1>Localización</h1>
                </div>
            </div>

            <div className="location-section">
                <div className="location-container">
                    <div className="contact-info">
                        <div className="delivery-options">
                            <div className="location-phone">
                                <span>Haz tu pedido a domicilio:</span>
                            </div>
                            <a 
                                href="https://www.just-eat.es/restaurants-redpizzaredpizza/menu" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="just-eat-link"
                            >
                                <img src={LogoJustEat} alt="Just Eat" className="location-platform-logo" />
                            </a>
                            <div className="location-phone">
                                <span>📞 954 760 049</span>
                            </div>
                            <div className="location-schedule">
                                <span className='location-phone'>Horario</span>
                                <p>Lunes a Domingo</p>
                                <p>13:30 - 16:00</p>
                                <p>20:00 - 24:00</p>
                            </div>
                        </div>
                    </div>
                    <div className="map-container">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3171.171211013563!2d-6.031769823684!3d37.362125535822244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126cfecf222241%3A0x4ffa2be2ff72004e!2sRed%20Pizza!5e0!3m2!1ses!2ses!4v1749147881837!5m2!1ses!2ses"
                            width="600"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Ubicación RedPizza"
                            onTouchStart={(e) => { e.preventDefault(); }}
                            onTouchMove={(e) => { e.preventDefault(); }}
                        ></iframe>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Localizacion