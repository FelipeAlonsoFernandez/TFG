import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductoDataService from '../services/productos.service';
import './EditarProducto.css';

const EditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        setLoading(true);
        const response = await ProductoDataService.getProducto(id);
        setFormData(response.data);
      } catch (err) {
        setError('Error al cargar el producto: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

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
      await ProductoDataService.updateProducto(id, formData);
      navigate('/carta');
    } catch (err) {
      setError('Error al actualizar el producto: ' + err.message);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="edit-producto-container">
      <h2>Editar Producto</h2>
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
    </div>
  );
};

export default EditarProducto;