import React from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { TicketIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface FasTagForm {
  vehicleNumber: string;
  amount: number;
}

const FasTagPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FasTagForm>();

  const onSubmit = async (data: FasTagForm) => {
    try {
      console.log('FasTag:', data);
      toast.success('FasTag recharged successfully!');
    } catch (error: any) {
      toast.error('Recharge failed');
    }
  };

  return (
    <Layout title="FasTag">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-2xl shadow-lg text-white p-6 mb-6">
          <div className="flex items-center">
            <TicketIcon className="w-10 h-10 mr-4" />
            <div>
              <h2 className="text-2xl font-bold">FasTag</h2>
              <p className="text-cyan-100">Easy highway toll payments</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Vehicle Number
              </label>
              <input
                {...register('vehicleNumber', { required: 'Vehicle number is required' })}
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="e.g., DL01AB1234"
              />
              {errors.vehicleNumber && (
                <p className="mt-2 text-sm text-red-600">{errors.vehicleNumber.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Recharge Amount (₹)
              </label>
              <input
                {...register('amount', { required: 'Amount is required' })}
                type="number"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Minimum ₹100"
              />
              {errors.amount && (
                <p className="mt-2 text-sm text-red-600">{errors.amount.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-bold rounded-lg hover:shadow-xl disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : 'Recharge FasTag'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default FasTagPage;
