import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import './Dashboard.css';

const Dashboard = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const stats = [
    { title: 'Total de Usuários', value: '1.234', icon: '👥', color: '#335252' },
    { title: 'Projetos Ativos', value: '56', icon: '📁', color: '#aa4b41' },
    { title: 'Tarefas Concluídas', value: '892', icon: '✅', color: '#2d3033' },
    { title: 'Receita', value: 'R$ 45.678', icon: '💰', color: '#335252' },
  ];

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
                  <h1>Painel de Controle</h1>
                  <p>Bem-vindo ao NPT Manager - Seu painel de gerenciamento de projetos</p>
                </div>
                
                <Row className="stats-row">
                  {stats.map((stat, index) => (
                    <Col key={index} xs={12} sm={6} lg={3} className="mb-3">
                      <Card className="stat-card">
                        <Card.Body>
                          <div className="stat-content">
                            <div className="stat-icon" style={{ backgroundColor: stat.color }}>
                              {stat.icon}
                            </div>
                            <div className="stat-info">
                              <Card.Title className="stat-value">{stat.value}</Card.Title>
                              <Card.Text className="stat-title">{stat.title}</Card.Text>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>

                <Row className="mt-4">
                  <Col xs={12} lg={8}>
                    <Card className="main-card">
                      <Card.Body>
                        <Card.Title>Atividade Recente</Card.Title>
                        <Card.Text>
                          <div className="activity-item">
                            <span className="activity-icon">📝</span>
                            <span className="activity-text">Novo projeto "Redesign do Site" criado</span>
                            <span className="activity-time">há 2 horas</span>
                          </div>
                          <div className="activity-item">
                            <span className="activity-icon">👤</span>
                            <span className="activity-text">Usuário João Silva entrou na equipe</span>
                            <span className="activity-time">há 4 horas</span>
                          </div>
                          <div className="activity-item">
                            <span className="activity-icon">✅</span>
                            <span className="activity-text">Tarefa "Layout da Página Inicial" concluída</span>
                            <span className="activity-time">há 1 dia</span>
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs={12} lg={4}>
                    <Card className="main-card">
                      <Card.Body>
                        <Card.Title>Ações Rápidas</Card.Title>
                        <Card.Text>
                          <div className="quick-action">
                            <span className="action-icon">➕</span>
                            <span className="action-text">Criar Novo Projeto</span>
                          </div>
                          <div className="quick-action">
                            <span className="action-icon">👥</span>
                            <span className="action-text">Adicionar Membro da Equipe</span>
                          </div>
                          <div className="quick-action">
                            <span className="action-icon">📊</span>
                            <span className="action-text">Gerar Relatório</span>
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
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