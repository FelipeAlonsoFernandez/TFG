import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FotoCarta from '../assets/inicio_carta.webp'
import FotoOfertas from '../assets/inicio_ofertas.webp'
import LogoRedPizza from '../assets/logo_redpizza_webp.webp'
import LogoJustEat from '../assets/Just_Eat.png'
import './Principal.css'

function Principal() {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    return (
        <>
            <div className="hero-section-main">
                <div className="hero-content">
                    <img src={LogoRedPizza} alt="RedPizza Logo" className="hero-logo" />
                    <h2>¡somos la pizza!</h2>
                    <p>Haz tu pedido a domicilio a través de:</p>
                    <div className="delivery-info">
                        <div className="delivery-platform">
                            <a 
                                href="https://www.just-eat.es/restaurants-redpizzaredpizza/menu" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <img src={LogoJustEat} alt="Just Eat" className="platform-logo" />
                            </a>
                        </div>
                        <div className="phone-number">
                            <span>📞 954 760 049</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="principal-container">
                <div className="images-container">
                    <div 
                        className="image-wrapper"
                        onClick={() => handleImageClick(FotoCarta)}
                        style={{ cursor: 'pointer' }}
                    >
                        <img src={FotoCarta} alt="Carta" />
                        <div className="image-overlay">
                            <h2>Carta</h2>
                        </div>
                    </div>
                    <div 
                        className="image-wrapper"
                        onClick={() => handleImageClick(FotoOfertas)}
                        style={{ cursor: 'pointer' }}
                    >
                        <img src={FotoOfertas} alt="Ofertas" />
                        <div className="image-overlay">
                            <h2>Ofertas</h2>
                        </div>
                    </div>
                </div>

                {selectedImage && (
                    <div className="modal-overlay" onClick={handleCloseModal}>
                        <div className="modal-image-container" onClick={e => e.stopPropagation()}>
                            <img src={selectedImage} alt="Imagen ampliada" />
                            <button className="close-button" onClick={handleCloseModal}>×</button>
                        </div>
                    </div>
                )}
            </div>
        
            <section className="featured-section">
                <div className="featured-content">
                    <h2>Nuestros productos más pedidos</h2>
                    <div className="featured-products">
                        <div className="product-item">
                            <img src="https://static.wixstatic.com/media/d4007e_04b33d26677a4ba98e34a20c6b758c45.jpg/v1/fill/w_860,h_780,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/d4007e_04b33d26677a4ba98e34a20c6b758c45.jpg" alt="Crispy Chicken" />
                            <div className="product-info">
                                <h3>Carbonara</h3>
                                <p>Masa fresca, salsa carbonara, mozzarella, champiñones, doble de bacon y a elegir entre cebolla o extra de queso.</p>
                            </div>
                        </div>
                        <div className="product-item">
                            <img src="https://static.wixstatic.com/media/d4007e_aa9d26adf2a14465b458e0b0bc3ea9f5.jpg/v1/fill/w_759,h_780,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/d4007e_aa9d26adf2a14465b458e0b0bc3ea9f5.jpg" alt="Baguette Americano" />
                            <div className="product-info">
                                <h3>Barbacoa</h3>
                                <p>Masa fresca, salsa barbacoa, mozzarella, pollo, bacon y doble de ternera</p>
                            </div>
                        </div>
                        <div className="product-item">
                            <img src="https://static.wixstatic.com/media/d4007e_05d374ea42934faeaf09ec175544e84d.jpg/v1/fill/w_930,h_780,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/d4007e_05d374ea42934faeaf09ec175544e84d.jpg" alt="Ensalada de Cabra" />
                            <div className="product-info">
                                <h3>Crostini</h3>
                                <p>Rebanada de pan cubierta por salsa con un toque de ajo, queso mozzarella y un ingrediente. (Jamon, bacon, pepperoni, atun, champiñon y 4 quesos.)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="reviews-section">
                <div className="reviews-content">
                    <h2>Algunas de nuestras valoraciones</h2>
                    <div className="reviews-container">
                        <div className="review-card">
                            <div className="review-header">
                                <div className="star-rating">★★★★★</div>
                            </div>
                            <p className="review-text">
                                "Las mejores pizzas de la zona sin duda. La masa está increíble y los ingredientes son de primera calidad. El servicio a domicilio es muy rápido."
                            </p>
                            <div className="review-author">
                                <p className="author-name">María García</p>
                                <p className="review-date">15/02/2024</p>
                            </div>
                        </div>

                        <div className="review-card">
                            <div className="review-header">
                                <div className="star-rating">★★★★★</div>
                            </div>
                            <p className="review-text">
                                "Pedimos habitualmente y nunca falla. Las pizzas están buenísimas y las ofertas son muy interesantes. Recomendado 100%"
                            </p>
                            <div className="review-author">
                                <p className="author-name">Juan López</p>
                                <p className="review-date">21/04/2024</p>
                            </div>
                        </div>

                        <div className="review-card">
                            <div className="review-header">
                                <div className="star-rating">★★★★★</div>
                            </div>
                            <p className="review-text">
                                "Realizan unas pizzas muy buenas y con buena calidad. He probado otros productos como son los enrrollados y el pan de ajo y están muy buenos también. El servicio a domicilio es rápido y el personal muy amable."
                            </p>
                            <div className="review-author">
                                <p className="author-name">Rosendo Hermida</p>
                                <p className="review-date">03/05/2024</p>
                            </div>
                        </div>

                        <div className="review-card">
                            <div className="review-header">
                                <div className="star-rating">★★★★★</div>
                            </div>
                            <p className="review-text">
                                "Soy de San Juan de Aznalfarache y para mí las mejores pizzas de todo el pueblo. La oferta de 2x1 es diaria, las puedes personalizar por mitades y es que están buenísimas."
                            </p>
                            <div className="review-author">
                                <p className="author-name">Edu Pedraza</p>
                                <p className="review-date">09/10/2024</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </> 
    )
}

export default Principal