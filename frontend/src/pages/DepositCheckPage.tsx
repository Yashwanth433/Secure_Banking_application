import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import { Account } from '../types';
import { accountService, transactionService } from '../services/api';
import { CheckCircleIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

interface DepositCheckForm {
  toAccountId: string;
  amount: number;
  checkNumber: string;
  bankName: string;
}

const DepositCheckPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<DepositCheckForm>();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const toAccountId = watch('toAccountId');
  const selectedAccount = accounts.find(a => a._id === toAccountId);

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

  const onSubmit = async (data: DepositCheckForm) => {
    try {
      await transactionService.deposit({
        accountId: data.toAccountId,
        amount: data.amount,
        description: `Check Deposit - Check #${data.checkNumber} from ${data.bankName}`
      });
      toast.success('Check deposited successfully! Funds will be available shortly.');
      window.location.href = '/dashboard';
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Check deposit failed');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <Layout title="Deposit Check">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Deposit Check">
      <div className="max-w-2xl mx-auto">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-lg shadow-lg text-white p-6 mb-6">
          <div className="flex items-center">
            <DocumentTextIcon className="w-10 h-10 mr-4" />
            <div>
              <h2 className="text-2xl font-bold">Deposit a Check</h2>
              <p className="text-green-100">Deposit checks quickly and securely</p>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-green-900 mb-2">How it works:</h3>
          <ul className="space-y-2 text-sm text-green-800">
            <li>✓ Enter check details and select the account to deposit to</li>
            <li>✓ Funds are typically available within 1-2 business days</li>
            <li>✓ Keep the original check for your records (safe disposal recommended)</li>
            <li>✓ You'll receive a confirmation for your records</li>
          </ul>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Account Selection */}
            <div>
              <label htmlFor="toAccountId" className="block text-sm font-medium text-gray-700 mb-2">
                Deposit Into Account
              </label>
              <select
                {...register('toAccountId', { required: 'Please select an account' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select account</option>
                {accounts.map((account) => (
                  <option key={account._id} value={account._id}>
                    {account.accountType.toUpperCase()} - •••• {account.accountNumber.slice(-4)} 
                    ({formatCurrency(account.balance)})
                  </option>
                ))}
              </select>
              {errors.toAccountId && (
                <p className="mt-1 text-sm text-red-600">{errors.toAccountId.message}</p>
              )}
            </div>

            {/* Current Balance */}
            {selectedAccount && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  Current balance: <span className="font-semibold text-lg">{formatCurrency(selectedAccount.balance)}</span>
                </p>
              </div>
            )}

            {/* Check Amount */}
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                Check Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  {...register('amount', { 
                    required: 'Check amount is required',
                    min: { value: 0.01, message: 'Amount must be at least $0.01' },
                    pattern: {
                      value: /^\d+(\.\d{1,2})?$/,
                      message: 'Please enter a valid amount'
                    }
                  })}
                  type="number"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="0.00"
                />
              </div>
              {errors.amount && (
                <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
              )}
            </div>

            {/* Check Number */}
            <div>
              <label htmlFor="checkNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Check Number
              </label>
              <input
                {...register('checkNumber', { 
                  required: 'Check number is required',
                  pattern: {
                    value: /^[0-9]{1,10}$/,
                    message: 'Enter a valid check number'
                  }
                })}
                type="text"
                placeholder="Enter check number (lower right corner)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.checkNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.checkNumber.message}</p>
              )}
            </div>

            {/* Bank Name */}
            <div>
              <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-2">
                Bank Name (Check Issuer)
              </label>
              <input
                {...register('bankName', { 
                  required: 'Bank name is required'
                })}
                type="text"
                placeholder="e.g., Chase Bank, Bank of America"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.bankName && (
                <p className="mt-1 text-sm text-red-600">{errors.bankName.message}</p>
              )}
            </div>

            {/* Summary */}
            {selectedAccount && (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Deposit Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account:</span>
                    <span className="font-medium">{selectedAccount.accountType.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Balance:</span>
                    <span className="font-medium">{formatCurrency(selectedAccount.balance)}</span>
                  </div>
                  <div className="border-t border-gray-300 my-2"></div>
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Balance After Deposit:</span>
                    <span>{formatCurrency(selectedAccount.balance + (Number(watch('amount')) || 0))}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? 'Processing Deposit...' : 'Deposit Check'}
            </button>

            {/* Info */}
            <div className="flex items-start bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <CheckCircleIcon className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-yellow-700">
                Important: Do not destroy the original check until the funds are confirmed in your account.
              </p>
            </div>
          </form>
        </div>

        {/* Support Info */}
        <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
          <p className="text-sm text-gray-600">
            If you have questions about depositing checks or if your deposit doesn't appear, please contact our support team.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default DepositCheckPage;
