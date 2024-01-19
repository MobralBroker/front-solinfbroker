// ordemController.js

import { crudApi } from './api';

const ordemController = {
  listarOrdem: async () => {
    try {
      const response = await crudApi.get('/ordem');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar ordens:', error);
      throw error;
    }
  },

  buscarOrdem: async (id) => {
    try {
      const response = await crudApi.get(`/ordem/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar ordem ${id}:`, error);
      throw error;
    }
  },

  criarOrdem: async (ordem) => {
    try {
      const response = await crudApi.post('/ordem', ordem);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar ordem:', error);
      throw error;
    }
  },

  cancelarOrdem: async (id, ordem) => {
    try {
      const response = await crudApi.put(`/ordem/cancelar-ordem/${id}`, ordem);
      return response.data;
    } catch (error) {
      console.error(`Erro ao cancelar ordem ${id}:`, error);
      throw error;
    }
  },

  getDetalhesAtivo: async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token não encontrado. Refaça o login.');
        return;
      }

      const response = await crudApi.get(`/ativo/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log(response);
      console.log(response.data.sigla);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar detalhes do ativo ${id}:`, error);
      throw error;
    }
  },
};

export default ordemController;

