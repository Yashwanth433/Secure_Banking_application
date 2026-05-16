import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Account } from '../types';
import { accountService, transactionService } from '../services/api';
import { PhoneIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface RechargeForm {
  fromAccountId: string;
  phoneNumber: string;
  operator: string;
  amount: number;
}

const RechargePage: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<RechargeForm>({
    defaultValues: {
      operator: 'jio'
    }
  });
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

  const onSubmit = async (data: RechargeForm) => {
    try {
      await transactionService.withdraw({
        accountId: data.fromAccountId,
        amount: data.amount,
        description: `Mobile Recharge - ${data.operator.toUpperCase()} - ${data.phoneNumber}`
      } as any);
      toast.success('Recharge completed successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Recharge failed');
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
      <Layout title="Mobile Recharge">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Mobile Recharge">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-lg text-white p-6 mb-6">
          <div className="flex items-center">
            <PhoneIcon className="w-10 h-10 mr-4" />
            <div>
              <h2 className="text-2xl font-bold">Mobile Recharge</h2>
              <p className="text-green-100">Quick and easy mobile recharge</p>
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
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
              <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  Available balance: <span className="font-bold text-lg">{formatCurrency(selectedAccount.balance)}</span>
                </p>
              </div>
            )}

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-3">
                Phone Number
              </label>
              <input
                {...register('phoneNumber', { 
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Enter a valid 10-digit phone number'
                  }
                })}
                type="tel"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your phone number"
              />
              {errors.phoneNumber && (
                <p className="mt-2 text-sm text-red-600">{errors.phoneNumber.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="operator" className="block text-sm font-semibold text-gray-700 mb-3">
                Operator
              </label>
              <select
                {...register('operator', { required: 'Please select an operator' })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="jio">Jio</option>
                <option value="airtel">Airtel</option>
                <option value="vodafone">Vodafone</option>
                <option value="bsnl">BSNL</option>
              </select>
              {errors.operator && (
                <p className="mt-2 text-sm text-red-600">{errors.operator.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-3">
                Recharge Amount (₹)
              </label>
              <input
                {...register('amount', { 
                  required: 'Amount is required', 
                  min: { value: 10, message: 'Minimum recharge is ₹10' },
                  max: selectedAccount ? { 
                    value: selectedAccount.balance, 
                    message: 'Amount cannot exceed available balance' 
                  } : undefined
                })}
                type="number"
                step="10"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter amount"
              />
              {errors.amount && (
                <p className="mt-2 text-sm text-red-600">{errors.amount.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? 'Processing Recharge...' : 'Recharge Now'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default RechargePage;
