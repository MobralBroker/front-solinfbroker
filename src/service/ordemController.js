// ordemController.js

import { crudApi } from './api';

const criarOrdem = async (ordem) => {
  try {
    const response = await crudApi.post('/ordens', ordem);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar ordem:', error);
    throw error;
  }
};

const obterOrdens = async () => {
  try {
    const response = await crudApi.get('/ordens');
    return response.data;
  } catch (error) {
    console.error('Erro ao obter ordens:', error);
    throw error;
  }
};

const criarOrdemCompra = async (ordemCompra) => {
  try {
    const response = await crudApi.post('/ordens/compra', ordemCompra);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar ordem de compra:', error);
    throw error;
  }
};

const criarOrdemVenda = async (ordemVenda) => {
  try {
    const response = await crudApi.post('/ordens/venda', ordemVenda);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar ordem de venda:', error);
    throw error;
  }
};

export default {
  criarOrdem,
  obterOrdens,
  criarOrdemCompra,
  criarOrdemVenda,
};

