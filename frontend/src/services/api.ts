import axios from 'axios';
import { AuthResponse, Account, Transaction, TransactionRequest, User } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://banking-application-ieks.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  register: async (userData: any): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
};

export const userService = {
  getProfile: async (): Promise<{ user: User }> => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (data: Partial<User>): Promise<{ message: string; user: User }> => {
    const response = await api.put('/auth/profile', data);
    return response.data;
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<{ message: string }> => {
    const response = await api.post('/auth/change-password', {
      currentPassword,
      newPassword
    });
    return response.data;
  },
};

export const accountService = {
  getAccounts: async (): Promise<Account[]> => {
    const response = await api.get('/accounts');
    return response.data;
  },

  getAllAccounts: async (): Promise<Account[]> => {
    const response = await api.get('/accounts/browse/all');
    return response.data;
  },

  getAccount: async (accountId: string): Promise<Account> => {
    const response = await api.get(`/accounts/${accountId}`);
    return response.data;
  },

  getAccountTransactions: async (accountId: string, page = 1): Promise<{
    transactions: Transaction[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> => {
    const response = await api.get(`/accounts/${accountId}/transactions?page=${page}`);
    return response.data;
  },
};

export const transactionService = {
  transfer: async (data: TransactionRequest): Promise<Transaction> => {
    const response = await api.post('/transactions/transfer', data);
    return response.data.transaction;
  },

  deposit: async (data: TransactionRequest): Promise<Transaction> => {
    const response = await api.post('/transactions/deposit', data);
    return response.data.transaction;
  },

  withdraw: async (data: TransactionRequest): Promise<Transaction> => {
    const response = await api.post('/transactions/withdraw', data);
    return response.data.transaction;
  },

  getAllTransactions: async (page = 1, limit = 50): Promise<{
    transactions: Transaction[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> => {
    const response = await api.get(`/transactions?page=${page}&limit=${limit}`);
    return response.data;
  },
};

export default api;