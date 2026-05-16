import React from 'react';
import Layout from '../components/Layout';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

const InsurancePage: React.FC = () => {
  const insuranceProducts = [
    {
      id: '1',
      name: 'Health Insurance',
      coverage: '₹5-25 lakhs',
      premium: 'From ₹500/month',
      features: ['Cashless treatment', 'Pre & post hospitalization', 'Critical illness cover'],
    },
    {
      id: '2',
      name: 'Life Insurance',
      coverage: '₹25-1 Crore',
      premium: 'From ₹300/month',
      features: ['Term insurance', 'Endowment plans', 'Money-back plans'],
    },
    {
      id: '3',
      name: 'Motor Insurance',
      coverage: 'Full coverage',
      premium: 'From ₹2000/year',
      features: ['Third party liability', 'Collision coverage', 'Personal accident'],
    },
    {
      id: '4',
      name: 'Travel Insurance',
      coverage: 'Worldwide',
      premium: 'From ₹500/trip',
      features: ['Trip cancellation', 'Medical coverage', 'Baggage coverage'],
    },
  ];

  return (
    <Layout title="Insurance">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl shadow-lg text-white p-6 mb-6">
          <div className="flex items-center">
            <ShieldCheckIcon className="w-10 h-10 mr-4" />
            <div>
              <h2 className="text-2xl font-bold">Insurance Products</h2>
              <p className="text-teal-100">Secure your future with our insurance plans</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insuranceProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-4">{product.name}</h3>
              <div className="space-y-3 mb-6">
                <div>
                  <p className="text-xs text-gray-600">Coverage</p>
                  <p className="text-lg font-semibold text-teal-600">{product.coverage}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Premium</p>
                  <p className="text-lg font-semibold text-gray-900">{product.premium}</p>
                </div>
              </div>
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-2">Features</p>
                <ul className="space-y-1">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-700">✓ {feature}</li>
                  ))}
                </ul>
              </div>
              <button className="w-full py-2 px-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-lg hover:shadow-md">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default InsurancePage;
