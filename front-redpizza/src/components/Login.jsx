import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sha256 from 'crypto-js/sha256';
import { useUser } from '../context/UserContext';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const USERNAME = 'admin';
  const PASSWORD = 'fbec7e36f3f9c9ad97c1d4d3a37234234a6313302a44e0ee91f8cce878220e66';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hashedPassword = sha256(formData.password).toString();

    if (formData.username === USERNAME && hashedPassword === PASSWORD) {
      localStorage.setItem('isLoggedIn', 'true');
      login(); // Actualizamos el contexto
      navigate('/carta');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Iniciar Sesión</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuario:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;