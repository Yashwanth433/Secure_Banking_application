import React from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { HomeIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface LoanForm {
  loanType: string;
  amount: number;
  tenure: number;
}

const LoansPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoanForm>();

  const onSubmit = async (data: LoanForm) => {
    try {
      console.log('Loan Application:', data);
      toast.success('Loan application submitted!');
    } catch (error: any) {
      toast.error('Application failed');
    }
  };

  return (
    <Layout title="Loans">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl shadow-lg text-white p-6 mb-6">
          <div className="flex items-center">
            <HomeIcon className="w-10 h-10 mr-4" />
            <div>
              <h2 className="text-2xl font-bold">Personal Loans</h2>
              <p className="text-indigo-100">Quick loan approval with lowest rates</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Loan Type
              </label>
              <select
                {...register('loanType', { required: 'Please select loan type' })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select loan type...</option>
                <option value="personal">Personal Loan</option>
                <option value="home">Home Loan</option>
                <option value="education">Education Loan</option>
                <option value="auto">Auto Loan</option>
              </select>
              {errors.loanType && (
                <p className="mt-2 text-sm text-red-600">{errors.loanType.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Loan Amount (₹)
              </label>
              <input
                {...register('amount', { required: 'Amount is required' })}
                type="number"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter loan amount"
              />
              {errors.amount && (
                <p className="mt-2 text-sm text-red-600">{errors.amount.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Tenure (months)
              </label>
              <input
                {...register('tenure', { required: 'Tenure is required' })}
                type="number"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter loan tenure"
              />
              {errors.tenure && (
                <p className="mt-2 text-sm text-red-600">{errors.tenure.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold rounded-lg hover:shadow-xl disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Apply for Loan'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default LoansPage;
