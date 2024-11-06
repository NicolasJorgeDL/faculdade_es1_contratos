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
      return response.data.content;
    } catch (error) {
      throw new Error(`Erro ao buscar dados do contrato: ${error.message}`);
    }
  }

  async servicoTodosOsFornecedores(endpoint) {
    try {
      const response = await this.api.get(endpoint);
      return response.data.content;
    } catch (error) {
      throw new Error(`Erro ao buscar dados do fornecedor: ${error.message}`);
    }
  }

  async servicoExcluirFornecedor(endpoint) {
    try {
      const response = await this.api.delete(endpoint);
      return response.data.content;
    } catch (error) {
      throw new Error(`Erro ao deletar fornecedor: ${error.message}`);
    }
  }
  
}

export default ApiService;