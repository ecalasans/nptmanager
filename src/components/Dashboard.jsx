import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faFlask, 
  faChartLine, 
  faClock,
  faPlus,
  faFileMedical,
  faUserPlus,
  faChartBar,
  faExclamationTriangle,
  faFilePrescription,
  faCalculator,
  faSync
} from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import apiService from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState({
    totalPatients: null,
    totalPrescriptions: null,
    avgPrescriptions: null,
  });
  const [hospitalInfo, setHospitalInfo] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    fetchDashboardMetrics();
  }, []);

  const fetchDashboardMetrics = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Get dashboard data from the new API endpoint
      const dashboardData = await apiService.getDashboardData();
      
      setMetrics({
        totalPatients: dashboardData.totalPatients,
        totalPrescriptions: dashboardData.totalPrescriptions,
        avgPrescriptions: dashboardData.avgPrescriptions,
      });
      
      // Set additional dashboard data
      setHospitalInfo(dashboardData.hospital);
      setLastUpdated(dashboardData.lastUpdated);
      
      console.log('Dashboard data loaded successfully:', dashboardData);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Erro ao carregar dados do dashboard. ' + (err.message || ''));
      setMetrics({ totalPatients: 0, totalPrescriptions: 0, avgPrescriptions: 0 });
      setHospitalInfo(null);
      setLastUpdated(null);
    } finally {
      setIsLoading(false);
    }
  };

  const cardData = [
    {
      title: 'Pacientes em NPT no Hospital',
      value: metrics.totalPatients,
      icon: faUsers,
      color: '#3c7da6',
      description: 'Total de pacientes ativos em NPT neste hospital.',
    },
    {
      title: 'Prescrições Realizadas',
      value: metrics.totalPrescriptions,
      icon: faFilePrescription,
      color: '#73020c',
      description: 'Total de prescrições feitas para pacientes ativos.',
    },
    {
      title: 'Média de Prescrições por Paciente',
      value: metrics.avgPrescriptions,
      icon: faCalculator,
      color: '#03318c',
      description: 'Média de prescrições por paciente ativo.',
    },
  ];

  const formatActivityTime = (timestamp) => {
    if (!timestamp) return 'Agora mesmo';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Agora mesmo';
    if (diffInHours < 24) return `há ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `há ${diffInDays} dia${diffInDays > 1 ? 's' : ''}`;
  };

  const formatLastUpdated = (timestamp) => {
    if (!timestamp) return '';
    
    try {
      const date = new Date(timestamp);
      return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return '';
    }
  };

  const handleQuickAction = (action) => {
    console.log(`Executando ação: ${action}`);
    // TODO: Implement quick actions
  };

  return (
    <div className="dashboard-app">
      <Header onMobileMenuToggle={() => setShowMobileMenu(true)} />
      <Container fluid className="p-0">
        <Row className="g-0">
          <Col xs={12} md={3} lg={2} className="sidebar-container">
            <Sidebar showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />
          </Col>
          <Col xs={12} md={9} lg={10} className="main-content">
            <div className="dashboard">
              <Container fluid className="dashboard-container">
                <div className="dashboard-header">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h1>Painel de Controle NPT</h1>
                      <p>
                        {hospitalInfo ? (
                          <>
                            <strong>{hospitalInfo.name}</strong> - {hospitalInfo.type === 'PUBLICO' ? 'Hospital Público' : 
                                                                   hospitalInfo.type === 'PRIVADO' ? 'Hospital Privado' : 'Outros'}
                          </>
                        ) : (
                          'Indicadores do hospital selecionado'
                        )}
                      </p>
                    </div>
                    <div className="text-end">
                      {lastUpdated && (
                        <div className="mb-2">
                          <small className="text-muted">
                            Última atualização: {formatLastUpdated(lastUpdated)}
                          </small>
                        </div>
                      )}
                      <button 
                        className="btn btn-outline-primary btn-sm"
                        onClick={fetchDashboardMetrics}
                        disabled={isLoading}
                      >
                        <FontAwesomeIcon 
                          icon={faSync} 
                          className={isLoading ? 'fa-spin' : ''} 
                        />
                        {' '}Atualizar
                      </button>
                    </div>
                  </div>
                </div>
                {error && (
                  <Alert variant="danger" className="dashboard-alert">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
                    {error}
                  </Alert>
                )}
                <Row className="stats-row">
                  {cardData.map((card, idx) => (
                    <Col key={idx} xs={12} sm={6} lg={4} className="mb-3">
                      <Card className="stat-card">
                        <Card.Body>
                          <div className="stat-content">
                            <div className="stat-icon" style={{ backgroundColor: card.color }}>
                              {isLoading ? (
                                <Spinner animation="border" size="sm" variant="light" />
                              ) : (
                                <FontAwesomeIcon icon={card.icon} />
                              )}
                            </div>
                            <div className="stat-info">
                              <Card.Title className="stat-value">
                                {isLoading ? (
                                  <Spinner animation="border" size="sm" variant="primary" />
                                ) : (card.value === 0 || card.value === '0.00' ? (
                                  <span className="text-muted">Sem dados disponíveis</span>
                                ) : card.value)}
                              </Card.Title>
                              <Card.Text className="stat-title">{card.title}</Card.Text>
                              <Card.Text className="stat-desc">{card.description}</Card.Text>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Dashboard; 