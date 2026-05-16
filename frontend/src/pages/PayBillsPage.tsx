import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import { Account } from '../types';
import { accountService, transactionService } from '../services/api';
import { CreditCardIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface PayBillForm {
  fromAccountId: string;
  amount: number;
  billType: string;
  description: string;
}

const PayBillsPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<PayBillForm>({
    defaultValues: {
      billType: 'utilities'
    }
  });
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
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

  const onSubmit = async (data: PayBillForm) => {
    try {
      await transactionService.withdraw({
        accountId: data.fromAccountId,
        amount: data.amount,
        description: `${data.billType.toUpperCase()} - ${data.description}`
      });
      toast.success('Bill paid successfully!');
      window.location.href = '/dashboard';
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Bill payment failed');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const billTypes = [
    { value: 'utilities', label: 'Utilities (Electricity, Gas, Water)' },
    { value: 'internet', label: 'Internet & Phone' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'loan', label: 'Loan Payment' },
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'other', label: 'Other' }
  ];

  if (loading) {
    return (
      <Layout title="Pay Bills">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Pay Bills">
      <div className="max-w-2xl mx-auto">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg text-white p-6 mb-6">
          <div className="flex items-center">
            <CreditCardIcon className="w-10 h-10 mr-4" />
            <div>
              <h2 className="text-2xl font-bold">Pay Bills Easily</h2>
              <p className="text-blue-100">Manage all your bills in one place</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Account Selection */}
            <div>
              <label htmlFor="fromAccountId" className="block text-sm font-medium text-gray-700 mb-2">
                Pay From Account
              </label>
              <select
                {...register('fromAccountId', { required: 'Please select an account' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select account</option>
                {accounts.map((account) => (
                  <option key={account._id} value={account._id}>
                    {account.accountType.toUpperCase()} - •••• {account.accountNumber.slice(-4)} 
                    ({formatCurrency(account.balance)})
                  </option>
                ))}
              </select>
              {errors.fromAccountId && (
                <p className="mt-1 text-sm text-red-600">{errors.fromAccountId.message}</p>
              )}
            </div>

            {/* Available Balance */}
            {selectedAccount && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  Available balance: <span className="font-semibold text-lg">{formatCurrency(selectedAccount.balance)}</span>
                </p>
              </div>
            )}

            {/* Bill Type */}
            <div>
              <label htmlFor="billType" className="block text-sm font-medium text-gray-700 mb-2">
                Bill Type
              </label>
              <select
                {...register('billType', { required: 'Please select a bill type' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {billTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.billType && (
                <p className="mt-1 text-sm text-red-600">{errors.billType.message}</p>
              )}
            </div>

            {/* Amount */}
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  {...register('amount', { 
                    required: 'Amount is required',
                    min: { value: 0.01, message: 'Amount must be at least $0.01' },
                    max: selectedAccount ? { 
                      value: selectedAccount.balance, 
                      message: 'Amount cannot exceed available balance' 
                    } : undefined,
                    pattern: {
                      value: /^\d+(\.\d{1,2})?$/,
                      message: 'Please enter a valid amount'
                    }
                  })}
                  type="number"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>
              {errors.amount && (
                <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Bill Reference/Details (Optional)
              </label>
              <input
                {...register('description')}
                type="text"
                placeholder="e.g., Account number, reference number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Summary */}
            {selectedAccount && (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Payment Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">From Account:</span>
                    <span className="font-medium">{selectedAccount.accountType.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Balance:</span>
                    <span className="font-medium">{formatCurrency(selectedAccount.balance)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? 'Processing Payment...' : 'Pay Bill'}
            </button>

            {/* Info */}
            <div className="flex items-start bg-blue-50 p-4 rounded-lg border border-blue-200">
              <CheckCircleIcon className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-700">
                Your payment will be processed immediately and you'll receive a confirmation.
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default PayBillsPage;
