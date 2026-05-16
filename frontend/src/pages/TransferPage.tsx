import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import { Account, TransactionRequest, User } from '../types';
import { accountService, transactionService } from '../services/api';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

interface TransferForm {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  description: string;
}

const TransferPage: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<TransferForm>();
  const [myAccounts, setMyAccounts] = useState<Account[]>([]);
  const [allAccounts, setAllAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fromAccountId = watch('fromAccountId');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoading(true);
        const [myData, allData] = await Promise.all([
          accountService.getAccounts(),
          accountService.getAllAccounts()
        ]);
        
        setMyAccounts(myData.filter(account => account.status === 'active'));
        setAllAccounts(allData.filter(account => account.status === 'active'));
      } catch (error) {
        console.error('Failed to fetch accounts:', error);
        toast.error('Failed to load accounts');
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const onSubmit = async (data: TransferForm) => {
    try {
      const response = await transactionService.transfer(data);
      toast.success('Transfer completed successfully!');
      
      // Refresh account balances
      const updatedAccounts = await accountService.getAccounts();
      // Update local storage with new account data if needed
      
      // Navigate after a short delay to show success message
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Transfer failed');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getAccountOwnerName = (account: Account) => {
    if (typeof account.userId === 'object' && account.userId) {
      const user = account.userId as User;
      return `${user.firstName} ${user.lastName}`;
    }
    return 'Unknown User';
  };

  const getAccountLabel = (account: Account, isRecipient: boolean = false) => {
    const accountInfo = `${account.accountType.toUpperCase()} - •••• ${account.accountNumber.slice(-4)}`;
    
    if (isRecipient && typeof account.userId === 'object' && account.userId) {
      const user = account.userId as User;
      return `${accountInfo} (${user.firstName} ${user.lastName})`;
    }
    return accountInfo;
  };

  // Filter out user's own accounts from recipient options
  const availableToAccounts = allAccounts.filter(account => account._id !== fromAccountId);
  const selectedFromAccount = myAccounts.find(account => account._id === fromAccountId);

  if (loading) {
    return (
      <Layout title="Transfer Money">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Transfer Money">
      <div className="max-w-3xl mx-auto">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg text-white p-6 mb-6">
          <div className="flex items-center">
            <ArrowDownTrayIcon className="w-10 h-10 mr-4" />
            <div>
              <h2 className="text-2xl font-bold">Transfer Money</h2>
              <p className="text-blue-100">Send money between your accounts or to other users</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* From Account */}
            <div>
              <label htmlFor="fromAccountId" className="block text-sm font-semibold text-gray-700 mb-3">
                From Account (Your Account)
              </label>
              <select
                {...register('fromAccountId', { required: 'Please select a source account' })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                <option value="">Select account to send from...</option>
                {myAccounts.map((account) => (
                  <option key={account._id} value={account._id}>
                    {getAccountLabel(account)} ({formatCurrency(account.balance)})
                  </option>
                ))}
              </select>
              {errors.fromAccountId && (
                <p className="mt-2 text-sm text-red-600 font-medium">{errors.fromAccountId.message}</p>
              )}
            </div>

            {/* From Account Balance */}
            {selectedFromAccount && (
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-600 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  Available balance: <span className="font-bold text-lg">{formatCurrency(selectedFromAccount.balance)}</span>
                </p>
              </div>
            )}

            {/* To Account */}
            <div>
              <label htmlFor="toAccountId" className="block text-sm font-semibold text-gray-700 mb-3">
                To Account (Recipient Account)
              </label>
              <select
                {...register('toAccountId', { required: 'Please select a destination account' })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                disabled={!fromAccountId}
              >
                <option value="">Select account to send to...</option>
                {availableToAccounts.map((account) => (
                  <option key={account._id} value={account._id}>
                    {getAccountLabel(account, true)}
                  </option>
                ))}
              </select>
              {errors.toAccountId && (
                <p className="mt-2 text-sm text-red-600 font-medium">{errors.toAccountId.message}</p>
              )}
              {!fromAccountId && (
                <p className="mt-2 text-sm text-gray-500">Please select a source account first</p>
              )}
            </div>

            {/* Amount */}
            <div>
              <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-3">
                Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-600 font-semibold">$</span>
                </div>
                <input
                  {...register('amount', { 
                    required: 'Amount is required',
                    min: { value: 0.01, message: 'Amount must be at least $0.01' },
                    max: selectedFromAccount ? { 
                      value: selectedFromAccount.balance, 
                      message: 'Amount cannot exceed available balance' 
                    } : undefined,
                    pattern: {
                      value: /^\d+(\.\d{1,2})?$/,
                      message: 'Please enter a valid amount'
                    }
                  })}
                  type="number"
                  step="0.01"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="0.00"
                />
              </div>
              {errors.amount && (
                <p className="mt-2 text-sm text-red-600 font-medium">{errors.amount.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-3">
                Description (Optional)
              </label>
              <input
                {...register('description', { 
                  required: 'Description is required',
                  minLength: { value: 1, message: 'Description cannot be empty' }
                })}
                type="text"
                placeholder="e.g., Payment for rent, loan transfer"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-600 font-medium">{errors.description.message}</p>
              )}
            </div>

            {/* Summary */}
            {selectedFromAccount && (
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 border-2 border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">Transfer Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">From Account:</span>
                    <span className="font-semibold text-gray-900">{selectedFromAccount.accountType.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Current Balance:</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(selectedFromAccount.balance)}</span>
                  </div>
                  <div className="border-t-2 border-gray-300 my-3"></div>
                  <div className="flex justify-between items-center text-lg">
                    <span className="text-gray-900 font-bold">Transfer Amount:</span>
                    <span className="font-bold text-blue-600">{formatCurrency(Number(watch('amount')) || 0)}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg">
                    <span className="text-gray-900 font-bold">Balance After Transfer:</span>
                    <span className="font-bold text-green-600">
                      {formatCurrency(selectedFromAccount.balance - (Number(watch('amount')) || 0))}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? 'Processing Transfer...' : 'Send Money'}
            </button>
          </form>
        </div>

        {/* Information */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Instant Transfers</h4>
            <p className="text-sm text-blue-800">Transfers between accounts are processed instantly</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Secure</h4>
            <p className="text-sm text-green-800">All transfers are encrypted and protected</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TransferPage;