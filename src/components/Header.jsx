import React, { useState } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      // Call the API logout endpoint
      console.log('Fazendo logout da API...');
      await apiService.logout();
      console.log('Logout realizado com sucesso na API');
      
      // Clear user data from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('selectedHospital');
      
      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      
      // Even if API logout fails, clear local data and redirect
      // This ensures user can't access protected areas
      localStorage.removeItem('user');
      localStorage.removeItem('selectedHospital');
      navigate('/login');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Navbar className="header" expand="lg">
      <Container fluid>
        <Navbar.Brand className="header-brand">
          <span className="header-icon">📋</span>
          <span className="header-title">NPT Manager</span>
        </Navbar.Brand>
        
        <Nav className="ms-auto">
          <Button 
            variant="outline-light" 
            className="logout-btn"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Saindo...
              </>
            ) : (
              'Sair'
            )}
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header; 