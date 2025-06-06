import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import LogoRedPizza from '../assets/logo_redpizza_webp.webp';
import './Contacto.css';

function Contacto() {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: ''
    });
    const [enviando, setEnviando] = useState(false);
    const form = useRef();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEnviando(true);

        try {
            const templateParams = {
                asunto: `Contactanos: ${formData.asunto}`,
                nombre: formData.nombre,
                telefono: formData.telefono,
                email: formData.email,
                mensaje: formData.mensaje
            };

            const result = await emailjs.send(
                'service_03xcgym',
                'template_lrchbjg',
                templateParams,
                '4q5LJyU7-EYhXcQPK'
            );

            console.log('SUCCESS!', result.status, result.text);
            
            if (result.status === 200) {
                alert('¡Mensaje enviado con éxito!');
                setFormData({
                    nombre: '',
                    email: '',
                    telefono: '',
                    asunto: '',
                    mensaje: ''
                });
            }
        } catch (error) {
            console.error('FAILED...', error);
            alert('Error al enviar el mensaje. Por favor, inténtalo de nuevo.');
        } finally {
            setEnviando(false);
        }
    };

    return (
        <>
            <div className="contacto-hero-section">
                <div className="contacto-hero-content">
                    <img src={LogoRedPizza} alt="RedPizza Logo" className="contacto-hero-logo" />
                    <h2>¡somos la pizza!</h2>
                    <h1>Contacto</h1>
                </div>
            </div>

            <div className="contacto-section">
                <div className="contacto-container">
                    <h2>Consultas y sugerencias</h2>
                    <p>Si deseas contactar con nosotros envíanos el siguiente formulario y te responderemos lo antes posible.</p>
                    
                    <form ref={form} className="contacto-form" onSubmit={handleSubmit}>
                        <div className="contacto-form-group">
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                placeholder="Nombre"
                                required
                            />
                        </div>
                        <div className="contacto-form-group">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className="contacto-form-group">
                            <input
                                type="tel"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                placeholder="Teléfono"
                                required
                            />
                        </div>
                        <div className="contacto-form-group">
                            <input
                                type="text"
                                name="asunto"
                                value={formData.asunto}
                                onChange={handleChange}
                                placeholder="Asunto"
                                required
                            />
                        </div>
                        <div className="contacto-form-group">
                            <textarea
                                name="mensaje"
                                value={formData.mensaje}
                                onChange={handleChange}
                                placeholder="Mensaje"
                                required
                                rows="6"
                            ></textarea>
                        </div>
                        <div className="contacto-form-group contacto-checkbox-group">
                            <input
                                type="checkbox"
                                id="privacidad"
                                required
                            />
                            <label htmlFor="privacidad">
                                He leído y acepto la política de privacidad
                            </label>
                        </div>
                        <button 
                            type="submit" 
                            className="contacto-submit-button"
                            disabled={enviando}
                        >
                            {enviando ? 'Enviando...' : 'Enviar'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
export default Contacto;