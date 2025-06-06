import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import ProductoDataService from '../services/productos.service';
import LogoRedPizza from '../assets/logo_redpizza_webp.webp';
import './Carta.css';

const Carta = ({ onCategoryChange }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();
  const [activeCategory, setActiveCategory] = useState('pizzas');
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const categories = [
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
        const response = await ProductoDataService.getProductosByTipo(activeCategory);
        
        const filteredProducts = isAuthenticated 
          ? response.data 
          : response.data.filter(producto => producto.disponible);

        setProductos(filteredProducts);
        setError(null);
      } catch (err) {
        setError('Error al cargar los productos: ' + err.message);
        setProductos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory, isAuthenticated]);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
  };

  const handleProductClick = (producto) => {
    setSelectedProduct(producto);
  };

  const handleProductSelect = (producto) => {
    if (isAuthenticated) {
      setSelectedProductId(selectedProductId === producto.id ? null : producto.id);
    } else {
      setSelectedProduct(producto);
    }
  };

  const handleEdit = () => {
    if (selectedProductId) {
      navigate(`/productos/${selectedProductId}`);
    } else {
      alert('Por favor, selecciona un producto para editar');
    }
  };

  const handleDelete = async () => {
    if (!selectedProductId) {
      alert('Por favor, selecciona un producto para eliminar');
      return;
    }

    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await ProductoDataService.deleteProducto(selectedProductId);
        const response = await ProductoDataService.getProductosByTipo(activeCategory);
        setProductos(response.data);
        setSelectedProductId(null);
      } catch (err) {
        setError('Error al eliminar el producto: ' + err.message);
      }
    }
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div>
      <div className="hero-section-carta">
        <div className="hero-content">
          <img src={LogoRedPizza} alt="RedPizza Logo" className="hero-logo" />
          <h2>¡somos la pizza!</h2>
          <h1>Nuestra carta</h1>
        </div>
      </div>

      {isAuthenticated ? (
        <>
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

          <div className="admin-buttons">
            <button 
              className="admin-button add" 
              onClick={() => navigate('/productos/nuevo_producto')}
            >
              Añadir
            </button>
            <button 
              className="admin-button edit" 
              onClick={handleEdit}
              disabled={!selectedProductId}
            >
              Editar
            </button>
            <button 
              className="admin-button delete"
              onClick={handleDelete}
              disabled={!selectedProductId}
            >
              Eliminar
            </button>
          </div>

          {!loading && !error && (
            <div className="productos-container">
              {productos.map(producto => (
                <div 
                  key={producto.id} 
                  className={`producto-card ${selectedProductId === producto.id ? 'selected' : ''} ${!producto.disponible ? 'no-disponible' : ''}`}
                  onClick={() => handleProductSelect(producto)}
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
        </>
      ) : (
        <>
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

          {loading && <p>Cargando productos...</p>}
          {error && <p className="error">{error}</p>}

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
        </>
      )}
    </div>
  );
};

export default Carta;