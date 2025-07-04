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
        
        // Handle Django REST Framework error format
        let errorMessage = 'Erro desconhecido';
        
        if (errorData.errors && typeof errorData.errors === 'object') {
          // Django serializer errors format
          const errorMessages = [];
          Object.keys(errorData.errors).forEach(field => {
            if (Array.isArray(errorData.errors[field])) {
              errorMessages.push(`${field}: ${errorData.errors[field].join(', ')}`);
            } else {
              errorMessages.push(`${field}: ${errorData.errors[field]}`);
            }
          });
          errorMessage = errorMessages.join('; ');
        } else if (errorData.message) {
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

  // Test API connectivity and endpoint format
  async testApiConnection() {
    try {
      console.log('Testando conectividade com a API...');
      
      // Test basic connectivity
      const response = await fetch(`${this.baseURL}/`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });
      
      console.log('Status da resposta de teste:', response.status);
      console.log('Cabeçalhos da resposta de teste:', response.headers);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Dados da resposta de teste:', data);
        return { connected: true, data };
      } else {
        console.log('API retornou erro:', response.status);
        return { connected: false, status: response.status };
      }
    } catch (error) {
      console.error('Erro ao testar conectividade:', error);
      return { connected: false, error: error.message };
    }
  }

  // Get all hospitals
  async getHospitals() {
    return this.fetchWithErrorHandling(`${this.baseURL}/hospitais/`);
  }

  // Login doctor using Django session authentication
  async loginDoctor(credentials) {
    console.log('Tentando fazer login com credenciais:', {
      username: credentials.username,
      password: credentials.password ? '[HIDDEN]' : '[EMPTY]'
    });

    // Validate required fields
    if (!credentials.username || !credentials.password) {
      throw new Error('Usuário e senha são obrigatórios');
    }

    // Prepare request body according to Django backend expectations
    const requestBody = {
      username: credentials.username.trim(),
      password: credentials.password
    };

    console.log('Corpo da requisição sendo enviado:', {
      username: requestBody.username,
      password: '[HIDDEN]'
    });

    // Use the correct endpoint format based on Django backend
    const endpoint = `${this.baseURL}/auth/login/`;
    console.log(`Tentando endpoint: ${endpoint}`);

    try {
      const response = await this.fetchWithErrorHandling(endpoint, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      console.log('Resposta do login:', response);

      // Check for Django backend success response format
      if (response.success && response.user) {
        return { 
          success: true, 
          doctor: response.user,
          message: response.message || 'Login realizado com sucesso'
        };
      } else if (response.user) {
        // Fallback for different response formats
        return { 
          success: true, 
          doctor: response.user,
          message: 'Login realizado com sucesso'
        };
      } else {
        throw new Error(response.message || 'Resposta inválida do servidor');
      }
    } catch (error) {
      console.log(`Falha no endpoint ${endpoint}:`, error.message);
      
      // If it's a 400, try with form data instead of JSON (Django fallback)
      if (error.message.includes('400') || error.message.includes('Dados inválidos')) {
        try {
          console.log(`Tentando endpoint ${endpoint} com form data`);
          
          const formData = new FormData();
          formData.append('username', credentials.username.trim());
          formData.append('password', credentials.password);
          
          const formResponse = await this.fetchWithErrorHandling(endpoint, {
            method: 'POST',
            body: formData,
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            }
          });

          if (formResponse.success && formResponse.user) {
            return { 
              success: true, 
              doctor: formResponse.user,
              message: formResponse.message || 'Login realizado com sucesso'
            };
          }
        } catch (formError) {
          console.log(`Falha com form data no endpoint ${endpoint}:`, formError.message);
        }
      }
      
      throw error;
    }
  }

  // Check authentication status
  async checkAuth() {
    try {
      const response = await this.fetchWithErrorHandling(`${this.baseURL}/auth/check/`);
      return response;
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return { authenticated: false };
    }
  }

  // Get current user profile
  async getProfile() {
    return this.fetchWithErrorHandling(`${this.baseURL}/auth/profile/`);
  }

  // Get login history for the authenticated user
  async getLoginHistory() {
    return this.fetchWithErrorHandling(`${this.baseURL}/auth/login-history/`);
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

  // Get patients
  async getPatients() {
    return this.fetchWithErrorHandling(`${this.baseURL}/pacientes/`);
  }

  // Get NPT records
  async getNPTRecords() {
    return this.fetchWithErrorHandling(`${this.baseURL}/npts/`);
  }

  // Get prescriptions
  async getPrescriptions() {
    return this.fetchWithErrorHandling(`${this.baseURL}/prescricoes/`);
  }

  // Get dashboard data
  async getDashboardData(hospitalId = null) {
    try {
      // Get hospital ID from localStorage if not provided
      if (!hospitalId) {
        const storedHospital = localStorage.getItem('selectedHospital');
        if (storedHospital) {
          hospitalId = storedHospital;
        }
      }

      if (!hospitalId) {
        throw new Error('Hospital ID is required for dashboard data');
      }

      const data = await this.fetchWithErrorHandling(`${this.baseURL}/dashboard/?hospital_id=${hospitalId}`);
      
      // Transform API response to match frontend expectations
      return {
        totalPatients: data.metrics.total_patients,
        totalPrescriptions: data.metrics.total_prescriptions,
        avgPrescriptions: data.metrics.avg_prescriptions,
        recentPrescriptions: data.metrics.recent_prescriptions,
        hospital: data.hospital,
        charts: data.charts,
        lastUpdated: data.last_updated
      };
    } catch (error) {
      console.log('Erro ao carregar dados do dashboard:', error.message);
      
      // Return fallback data on error
      return {
        totalPatients: 0,
        totalPrescriptions: 0,
        avgPrescriptions: 0,
        recentPrescriptions: 0,
        hospital: null,
        charts: null,
        lastUpdated: new Date().toISOString()
      };
    }
  }

  // Get active patients for a hospital
  async getActivePatientsByHospital(hospitalPublicId) {
    // /api/pacientes/?ativo=true&cod_hospital={hospital_id}
    return this.fetchWithErrorHandling(`${this.baseURL}/pacientes/?ativo=true&cod_hospital=${hospitalPublicId}`);
  }

  // Get all prescriptions for a list of patient IDs (fetch all, filter in frontend)
  async getAllPrescriptions() {
    return this.fetchWithErrorHandling(`${this.baseURL}/prescricoes/`);
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService; 