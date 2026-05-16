import React from 'react';
import Layout from '../components/Layout';
import { ChartBarIcon } from '@heroicons/react/24/outline';

const MutualFundsPage: React.FC = () => {
  const funds = [
    {
      id: '1',
      name: 'Growth Fund',
      type: 'Equity',
      returns: '14.5%',
      risk: 'High',
      minInvestment: 5000,
    },
    {
      id: '2',
      name: 'Balanced Fund',
      type: 'Hybrid',
      returns: '10.2%',
      risk: 'Medium',
      minInvestment: 1000,
    },
    {
      id: '3',
      name: 'Debt Fund',
      type: 'Debt',
      returns: '7.8%',
      risk: 'Low',
      minInvestment: 500,
    },
    {
      id: '4',
      name: 'Index Fund',
      type: 'Equity',
      returns: '12.1%',
      risk: 'Medium-High',
      minInvestment: 100,
    },
  ];

  return (
    <Layout title="Mutual Funds">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-2xl shadow-lg text-white p-6 mb-6">
          <div className="flex items-center">
            <ChartBarIcon className="w-10 h-10 mr-4" />
            <div>
              <h2 className="text-2xl font-bold">Mutual Funds</h2>
              <p className="text-amber-100">Invest wisely and grow your wealth</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {funds.map((fund) => (
            <div key={fund.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border-l-4 border-amber-600">
              <h3 className="text-lg font-bold text-gray-900 mb-4">{fund.name}</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs text-gray-600">Fund Type</p>
                  <p className="text-sm font-semibold text-gray-900">{fund.type}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Returns (1Y)</p>
                  <p className="text-sm font-semibold text-green-600">{fund.returns}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Risk Level</p>
                  <p className="text-sm font-semibold text-amber-600">{fund.risk}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Min Investment</p>
                  <p className="text-sm font-semibold text-gray-900">₹{fund.minInvestment}</p>
                </div>
              </div>
              <button className="w-full py-2 px-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-lg hover:shadow-md">
                Invest Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default MutualFundsPage;
