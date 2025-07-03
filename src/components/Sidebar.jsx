import React, { useState, useEffect } from 'react';
import { Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import apiService from '../services/api';
import './Sidebar.css';

const Sidebar = ({ showMobileMenu, setShowMobileMenu }) => {
  const location = useLocation();
  const [userProfile, setUserProfile] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/pacientes', label: 'Pacientes', icon: '👥' },
    { path: '/historico', label: 'Histórico', icon: '📋' },
    { path: '/estatisticas', label: 'Estatísticas', icon: '📈' },
    { path: '/protocolos', label: 'Protocolos', icon: '📋' },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch user profile
        const profile = await apiService.getProfile();
        setUserProfile(profile);
        
        // Get selected hospital from localStorage
        const hospitalId = localStorage.getItem('selectedHospital');
        console.log('Hospital ID from localStorage:', hospitalId);
        
        if (hospitalId && profile.hospitais) {
          try {
            // Find hospital from user's hospitals list
            console.log('Looking for hospital in user profile hospitals:', profile.hospitais);
            
            const hospital = profile.hospitais.find(h => h.public_id === hospitalId);
            console.log('Found hospital:', hospital);
            
            if (hospital) {
              setSelectedHospital(hospital);
              console.log('Hospital set in state:', hospital);
            } else {
              console.log('Hospital not found with ID:', hospitalId);
            }
          } catch (hospitalError) {
            console.error('Erro ao carregar dados do hospital:', hospitalError);
          }
        } else {
          console.log('No hospital ID found in localStorage or no hospitals in profile');
        }
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

    fetchUserData();
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

  // Debug: Log current state
  console.log('Current selectedHospital state:', selectedHospital);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="sidebar d-none d-md-block">
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
                {selectedHospital && (
                  <p className="user-hospital">
                    Hospital: {selectedHospital.nome}
                  </p>
                )}
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

      {/* Mobile Navigation */}
      <div className="mobile-nav d-md-none">

        <Offcanvas 
          show={showMobileMenu} 
          onHide={() => setShowMobileMenu(false)}
          placement="start"
          className="mobile-sidebar"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>NPT Manager</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {/* User Profile Section */}
            <div className="mobile-user-profile">
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
                    {selectedHospital && (
                      <p className="user-hospital">
                        Hospital: {selectedHospital.nome}
                      </p>
                    )}
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

            {/* Mobile Navigation Menu */}
            <Nav className="flex-column mobile-nav-menu">
              {menuItems.map((item) => (
                <Nav.Link
                  key={item.path}
                  as={Link}
                  to={item.path}
                  className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  <span className="mobile-nav-icon">{item.icon}</span>
                  <span className="mobile-nav-label">{item.label}</span>
                </Nav.Link>
              ))}
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
};

export default Sidebar; 