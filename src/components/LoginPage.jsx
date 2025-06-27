import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import Footer from './Footer';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    usuario: '',
    senha: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [showHospitalSelect, setShowHospitalSelect] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setShowHospitalSelect(false);
    setHospitals([]);
    setSelectedHospital('');

    try {
      const result = await apiService.loginDoctor(loginForm);
      if (result.success) {
        localStorage.setItem('user', JSON.stringify(result.doctor));
        const profile = await apiService.getProfile();
        if (profile.hospitais && profile.hospitais.length > 0) {
          setHospitals(profile.hospitais);
          setShowHospitalSelect(true);
        } else {
          setError('Nenhum hospital associado a este usuário.');
        }
      }
    } catch (err) {
      setError(err.message || 'Falha no login. Verifique seu usuário e senha.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleHospitalSelect = (e) => {
    setSelectedHospital(e.target.value);
  };

  const handleHospitalSubmit = (e) => {
    e.preventDefault();
    if (selectedHospital) {
      localStorage.setItem('selectedHospital', selectedHospital);
      navigate('/dashboard');
    } else {
      setError('Por favor, selecione um hospital.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-background">
        <Container fluid className="login-container">
          <Row className="justify-content-center">
            <Col xs={12} lg={10} xl={8}>
              <div className="login-card-container">
                <Card className="login-card">
                  <Card.Body className="login-card-body">
                    <div className="login-header">
                      <div className="login-logo">
                        <span className="logo-icon">💊</span>
                      </div>
                      <h1 className="login-title">NPT Manager</h1>
                      <p className="login-subtitle">Entre na sua conta</p>
                    </div>

                    {error && (
                      <Alert variant="danger" className="login-alert">
                        {error}
                      </Alert>
                    )}

                    {!showHospitalSelect ? (
                      <Form onSubmit={handleLoginSubmit} className="login-form">
                        <Form.Group className="mb-3">
                          <Form.Label>Usuário</Form.Label>
                          <Form.Control
                            type="text"
                            name="usuario"
                            value={loginForm.usuario}
                            onChange={handleInputChange}
                            placeholder="Digite seu usuário"
                            required
                            className="login-input"
                          />
                        </Form.Group>

                        <Form.Group className="mb-4">
                          <Form.Label>Senha</Form.Label>
                          <Form.Control
                            type="password"
                            name="senha"
                            value={loginForm.senha}
                            onChange={handleInputChange}
                            placeholder="Digite sua senha"
                            required
                            className="login-input"
                          />
                        </Form.Group>

                        <div className="d-grid">
                          <Button 
                            type="submit" 
                            variant="primary" 
                            className="login-button"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Entrando...
                              </>
                            ) : (
                              'Entrar'
                            )}
                          </Button>
                        </div>
                      </Form>
                    ) : (
                      <Form onSubmit={handleHospitalSubmit} className="login-form">
                        <Form.Group className="mb-4">
                          <Form.Label>Selecione o Hospital</Form.Label>
                          <Form.Select
                            value={selectedHospital}
                            onChange={handleHospitalSelect}
                            required
                            className="login-input"
                          >
                            <option value="">Selecione um hospital</option>
                            {hospitals.map((hospital) => (
                              <option key={hospital.public_id} value={hospital.public_id}>
                                {hospital.nome}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                        <div className="d-grid">
                          <Button 
                            type="submit" 
                            variant="primary" 
                            className="login-button"
                          >
                            Confirmar
                          </Button>
                        </div>
                      </Form>
                    )}

                    <div className="login-footer">
                      <p className="text-muted">
                        Não tem uma conta?{' '}
                        <a href="#" className="signup-link">Entre em contato com o administrador</a>
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage; 