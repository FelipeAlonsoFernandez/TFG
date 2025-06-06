import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductoDataService from '../services/productos.service';
import './EditarProducto.css';

const NuevoProducto = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    disponible: true,
    imagen_url: '',
    tipo: 'pizzas'
  });

  const tiposProducto = [
    'pizzas',
    'burgers',
    'baguettes',
    'entrantes',
    'bebidas',
    'helados'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ProductoDataService.createProducto(formData);
      navigate('/carta');
    } catch (err) {
      setError('Error al crear el producto: ' + err.message);
    }
  };

  return (
    <div className="edit-producto-container">
      <h2>Nuevo Producto</h2>
      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="precio">Precio:</label>
          <input
            type="number"
            id="precio"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="disponible" className="checkbox-label">
            <input
              type="checkbox"
              id="disponible"
              name="disponible"
              checked={formData.disponible}
              onChange={handleChange}
            />
            Disponible
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="imagen_url">URL de la imagen:</label>
          <input
            type="url"
            id="imagen_url"
            name="imagen_url"
            value={formData.imagen_url}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tipo">Tipo de producto:</label>
          <select
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
          >
            {tiposProducto.map(tipo => (
              <option key={tipo} value={tipo}>
                {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="form-buttons">
          <button type="submit" className="save-button">Guardar</button>
          <button 
            type="button" 
            className="cancel-button"
            onClick={() => navigate('/carta')}
          >
            Cancelar
          </button>
        </div>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default NuevoProducto;