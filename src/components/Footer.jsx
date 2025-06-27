import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-text">
          <span className="footer-copyright">
            © {currentYear} ECalasans. Todos os direitos reservados.
          </span>
        </div>
        <div className="footer-links">
          <a href="#" className="footer-link">Termos de Uso</a>
          <span className="footer-separator">•</span>
          <a href="#" className="footer-link">Política de Privacidade</a>
          <span className="footer-separator">•</span>
          <a href="#" className="footer-link">Suporte</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 