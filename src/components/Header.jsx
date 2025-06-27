import React, { useState } from 'react';
import { Navbar, Nav, Button, Modal, Form, Container } from 'react-bootstrap';
import './Header.css';

const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement login logic with Django API
    console.log('Tentativa de login:', loginForm);
    setShowLoginModal(false);
    setLoginForm({ username: '', password: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <Navbar className="header" expand="lg">
        <Container fluid>
          <Navbar.Brand className="header-brand">
            <span className="header-icon">🚀</span>
            <span className="header-title">NPT Manager</span>
          </Navbar.Brand>
          
          <Nav className="ms-auto">
            <Button 
              variant="outline-light" 
              className="login-btn"
              onClick={() => setShowLoginModal(true)}
            >
              <span className="login-icon">👤</span>
              Entrar
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Login Modal */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
        <Modal.Header closeButton className="modal-header">
          <Modal.Title>Entrar no NPT Manager</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome de Usuário</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={loginForm.username}
                onChange={handleInputChange}
                placeholder="Digite seu nome de usuário"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleInputChange}
                placeholder="Digite sua senha"
                required
              />
            </Form.Group>
            <div className="d-grid">
              <Button type="submit" variant="primary" className="login-submit-btn">
                Entrar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Header; 