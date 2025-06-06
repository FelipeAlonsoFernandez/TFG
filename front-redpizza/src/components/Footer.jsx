import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} RedPizza. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;