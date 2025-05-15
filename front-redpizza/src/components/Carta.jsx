import React, { useState, useEffect } from 'react';
import ProductoDataService from '../services/productos.service';
import OfertasDataService from '../services/ofertas.service';
import './Carta.css';

const Carta = ({ onCategoryChange }) => {
  const [activeCategory, setActiveCategory] = useState('ofertas');
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const categories = [
    { id: 'ofertas', name: 'OFERTAS' },
    { id: 'pizzas', name: 'PIZZAS' },
    { id: 'burgers', name: 'BURGERS' },
    { id: 'baguettes', name: 'BAGUETTES' },
    { id: 'entrantes', name: 'ENTRANTES' },
    { id: 'bebidas', name: 'BEBIDAS' },
    { id: 'helados', name: 'HELADOS' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let response;
        
        if (activeCategory === 'ofertas') {
          response = await OfertasDataService.getOfertas();
        } else {
          response = await ProductoDataService.getProductosByTipo(activeCategory);
        }
        
        setProductos(response.data);
        setError(null);
      } catch (err) {
        setError('Error al cargar los productos: ' + err.message);
        setProductos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);
  
  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
  };

  const handleProductClick = (producto) => {
    setSelectedProduct(producto);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div>
      <nav className="carta-navbar">
        <div className="navbar-container">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-button ${activeCategory === category.id ? 'active' : ''} ${category.id}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </nav>

      {!loading && !error && (
        <div className="productos-container">
          {productos.map(producto => (
            <div 
              key={producto.id} 
              className="producto-card"
              onClick={() => handleProductClick(producto)}
            >
              <div className="producto-imagen">
                <img src={producto.imagen_url} alt={producto.nombre} />
              </div>
              <div className="producto-info">
                <h3 className="producto-titulo">{producto.nombre}</h3>
                <p className="producto-descripcion desktop-only">{producto.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-imagen">
              <img src={selectedProduct.imagen_url} alt={selectedProduct.nombre} />
            </div>
            <div className="modal-info">
              <h2>{selectedProduct.nombre}</h2>
              <p className="modal-descripcion">{selectedProduct.descripcion}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carta;