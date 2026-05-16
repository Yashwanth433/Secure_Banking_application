import React from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface TaxPaymentForm {
  taxType: string;
  financialYear: string;
  amount: number;
}

const TaxPaymentsPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TaxPaymentForm>();

  const onSubmit = async (data: TaxPaymentForm) => {
    try {
      console.log('Tax Payment:', data);
      toast.success('Tax payment processed!');
    } catch (error: any) {
      toast.error('Payment failed');
    }
  };

  return (
    <Layout title="Tax Payments">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-lg text-white p-6 mb-6">
          <div className="flex items-center">
            <DocumentTextIcon className="w-10 h-10 mr-4" />
            <div>
              <h2 className="text-2xl font-bold">Tax Payments</h2>
              <p className="text-red-100">Pay income tax and other taxes online</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Tax Type
              </label>
              <select
                {...register('taxType', { required: 'Please select tax type' })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select tax type...</option>
                <option value="income-tax">Income Tax</option>
                <option value="gst">GST</option>
                <option value="property-tax">Property Tax</option>
                <option value="professional-tax">Professional Tax</option>
              </select>
              {errors.taxType && (
                <p className="mt-2 text-sm text-red-600">{errors.taxType.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Financial Year
              </label>
              <input
                {...register('financialYear', { required: 'FY is required' })}
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="e.g., 2023-24"
              />
              {errors.financialYear && (
                <p className="mt-2 text-sm text-red-600">{errors.financialYear.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Amount (₹)
              </label>
              <input
                {...register('amount', { required: 'Amount is required' })}
                type="number"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter tax amount"
              />
              {errors.amount && (
                <p className="mt-2 text-sm text-red-600">{errors.amount.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-lg hover:shadow-xl disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : 'Pay Tax'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default TaxPaymentsPage;
