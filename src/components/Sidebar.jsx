import React, { useState, useEffect } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import apiService from '../services/api';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const menuItems = [
    { path: '/dashboard', label: 'Painel de Controle', icon: '📊' },
    { path: '/users', label: 'Usuários', icon: '👥' },
    { path: '/projects', label: 'Projetos', icon: '📁' },
    { path: '/reports', label: 'Relatórios', icon: '📈' },
    { path: '/settings', label: 'Configurações', icon: '⚙️' },
  ];

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const profile = await apiService.getProfile();
        setUserProfile(profile);
      } catch (error) {
        console.error('Erro ao carregar perfil do usuário:', error);
        // Fallback to localStorage data if API fails
        const localUser = localStorage.getItem('user');
        if (localUser) {
          setUserProfile(JSON.parse(localUser));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const formatLastLogin = (lastLogin) => {
    if (!lastLogin) return 'Informação não disponível';
    
    const date = new Date(lastLogin);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Agora mesmo';
    if (diffInHours < 24) return `há ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `há ${diffInDays} dia${diffInDays > 1 ? 's' : ''}`;
  };

  const getDoctorTitle = (gender) => {
    if (!gender) return 'Dr(a).';
    return gender.toLowerCase() === 'f' ? 'Dra.' : 'Dr.';
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        {isLoading ? (
          <div className="user-profile-loading">
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            <span className="ms-2">Carregando perfil...</span>
          </div>
        ) : userProfile ? (
          <div className="user-profile">
            <div className="user-info">
              <h4 className="user-name">
                {getDoctorTitle(userProfile.genero)} {userProfile.nome || userProfile.name || 'Usuário'}
              </h4>
              <p className="user-crm">
                CRM: {userProfile.crm || 'N/A'}
              </p>
              <p className="user-last-login">
                Último acesso: {formatLastLogin(userProfile.last_login || userProfile.lastLogin)}
              </p>
            </div>
          </div>
        ) : (
          <div className="user-profile-error">
            <span className="error-icon">⚠️</span>
            <span className="error-text">Erro ao carregar perfil</span>
          </div>
        )}
      </div>
      <Nav className="flex-column sidebar-nav">
        {menuItems.map((item) => (
          <Nav.Link
            key={item.path}
            as={Link}
            to={item.path}
            className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar; 