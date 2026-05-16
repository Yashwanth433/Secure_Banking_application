import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Account } from '../types';
import { accountService, transactionService } from '../services/api';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface UPIPaymentForm {
  fromAccountId: string;
  upiId: string;
  amount: number;
  description: string;
}

const UPIPaymentPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<UPIPaymentForm>();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fromAccountId = watch('fromAccountId');
  const selectedAccount = accounts.find(a => a._id === fromAccountId);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await accountService.getAccounts();
        setAccounts(data.filter(account => account.status === 'active'));
      } catch (error) {
        console.error('Failed to fetch accounts:', error);
        toast.error('Failed to load accounts');
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const onSubmit = async (data: UPIPaymentForm) => {
    try {
      await transactionService.withdraw({
        accountId: data.fromAccountId,
        amount: data.amount,
        description: `UPI Payment to ${data.upiId} - ${data.description || 'No description'}`
      } as any);
      toast.success('UPI payment completed successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Payment failed');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  if (loading) {
    return (
      <Layout title="UPI Payments">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="UPI Payments">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl shadow-lg text-white p-6 mb-6">
          <div className="flex items-center">
            <PaperAirplaneIcon className="w-10 h-10 mr-4" />
            <div>
              <h2 className="text-2xl font-bold">UPI Payments</h2>
              <p className="text-pink-100">Send money via UPI instantly</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Account Selection */}
            <div>
              <label htmlFor="fromAccountId" className="block text-sm font-semibold text-gray-700 mb-3">
                From Account
              </label>
              <select
                {...register('fromAccountId', { required: 'Please select an account' })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="">Select account...</option>
                {accounts.map((account) => (
                  <option key={account._id} value={account._id}>
                    {account.accountType.toUpperCase()} - {formatCurrency(account.balance)}
                  </option>
                ))}
              </select>
              {errors.fromAccountId && (
                <p className="mt-2 text-sm text-red-600">{errors.fromAccountId.message}</p>
              )}
            </div>

            {selectedAccount && (
              <div className="bg-pink-50 border-l-4 border-pink-600 rounded-lg p-4">
                <p className="text-sm text-pink-800">
                  Available balance: <span className="font-bold text-lg">{formatCurrency(selectedAccount.balance)}</span>
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                UPI ID
              </label>
              <input
                {...register('upiId', { 
                  required: 'UPI ID is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/,
                    message: 'Enter a valid UPI ID (username@bankname)'
                  }
                })}
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="username@bankname"
              />
              {errors.upiId && (
                <p className="mt-2 text-sm text-red-600">{errors.upiId.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Amount (₹)
              </label>
              <input
                {...register('amount', { 
                  required: 'Amount is required',
                  min: { value: 1, message: 'Amount must be at least ₹1' },
                  max: selectedAccount ? {
                    value: selectedAccount.balance,
                    message: 'Amount cannot exceed available balance'
                  } : undefined
                })}
                type="number"
                step="0.01"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Enter amount"
              />
              {errors.amount && (
                <p className="mt-2 text-sm text-red-600">{errors.amount.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Description (Optional)
              </label>
              <textarea
                {...register('description')}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Optional message for receiver"
                rows={3}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold rounded-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? 'Processing Payment...' : 'Send Payment'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UPIPaymentPage;
