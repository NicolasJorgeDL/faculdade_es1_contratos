import axios from 'axios';

class ApiService {
  constructor(baseURL) {
    this.api = axios.create({
      baseURL: baseURL,
    });
  }

  async servicoTodosOsContratos(endpoint) {
    try {
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao buscar dados: ${error.message}`);
    }
  }

}

export default apiService;