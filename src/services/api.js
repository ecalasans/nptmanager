// API configuration and service functions
const API_BASE_URL = 'http://localhost:8000/api';

// API service class
class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Generic fetch method with error handling and CORS support
  async fetchWithErrorHandling(url, options = {}) {
    try {
      console.log('Fazendo requisição para a API:', url);
      console.log('Opções da requisição:', options);
      
      const response = await fetch(url, {
        credentials: 'include', // Important for session cookies
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      console.log('Status da resposta:', response.status);
      console.log('Cabeçalhos da resposta:', response.headers);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Resposta de erro da API:', errorData);
        
        // Traduzir mensagens de erro comuns
        let errorMessage = 'Erro desconhecido';
        
        if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.detail) {
          errorMessage = errorData.detail;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        } else {
          // Mensagens de erro baseadas no status HTTP
          switch (response.status) {
            case 400:
              errorMessage = 'Dados inválidos enviados. Verifique as informações e tente novamente.';
              break;
            case 401:
              errorMessage = 'Credenciais inválidas. Verifique seu usuário e senha.';
              break;
            case 403:
              errorMessage = 'Acesso negado. Você não tem permissão para realizar esta ação.';
              break;
            case 404:
              errorMessage = 'Recurso não encontrado. Verifique se a URL está correta.';
              break;
            case 500:
              errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
              break;
            case 502:
              errorMessage = 'Servidor temporariamente indisponível. Tente novamente em alguns minutos.';
              break;
            case 503:
              errorMessage = 'Serviço temporariamente indisponível. Tente novamente mais tarde.';
              break;
            default:
              errorMessage = `Erro na comunicação com o servidor (${response.status}). Tente novamente.`;
          }
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Dados da resposta da API:', data);
      return data;
    } catch (error) {
      console.error('Falha na requisição da API:', error);
      
      // Traduzir erros de rede
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão com a internet e se o servidor está rodando.');
      }
      
      throw error;
    }
  }

  // Get all hospitals
  async getHospitals() {
    return this.fetchWithErrorHandling(`${this.baseURL}/hospitais/`);
  }

  // Login doctor using Django session authentication
  async loginDoctor(credentials) {
    const response = await this.fetchWithErrorHandling(`${this.baseURL}/auth/login/`, {
      method: 'POST',
      body: JSON.stringify({
        usuario: credentials.usuario,
        senha: credentials.senha
      })
    });

    if (response.success) {
      return { success: true, doctor: response.user };
    } else {
      throw new Error(response.message || 'Falha no processo de login. Verifique suas credenciais.');
    }
  }

  // Check authentication status
  async checkAuth() {
    try {
      const response = await this.fetchWithErrorHandling(`${this.baseURL}/auth/check/`);
      return response;
    } catch (error) {
      return { authenticated: false };
    }
  }

  // Get current user profile
  async getProfile() {
    return this.fetchWithErrorHandling(`${this.baseURL}/auth/profile/`);
  }

  // Logout
  async logout() {
    return this.fetchWithErrorHandling(`${this.baseURL}/auth/logout/`, {
      method: 'POST'
    });
  }

  // Get doctor by ID
  async getDoctor(doctorId) {
    return this.fetchWithErrorHandling(`${this.baseURL}/medicos/${doctorId}/`);
  }

  // Get hospitals for a specific doctor
  async getDoctorHospitals(doctorId) {
    return this.fetchWithErrorHandling(`${this.baseURL}/medicos/${doctorId}/hospitais/`);
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService; 