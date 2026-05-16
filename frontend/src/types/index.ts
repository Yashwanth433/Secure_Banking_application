export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  isEmailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Account {
  _id: string;
  userId: string | User;
  accountNumber: string;
  accountType: 'checking' | 'savings' | 'credit';
  balance: number;
  currency: string;
  status: 'active' | 'inactive' | 'frozen';
  overdraftLimit?: number;
  interestRate?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  _id: string;
  fromAccountId?: string;
  toAccountId?: string;
  amount: number;
  currency: string;
  type: 'deposit' | 'withdrawal' | 'transfer' | 'payment';
  description: string;
  status: 'pending' | 'completed' | 'failed';
  reference: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface TransactionRequest {
  fromAccountId?: string;
  toAccountId?: string;
  accountId?: string;
  amount: number;
  description: string;
}