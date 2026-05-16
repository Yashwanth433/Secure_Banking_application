import React, { useState } from 'react';
import Layout from '../components/Layout';
import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

const StocksPage: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState<string | null>(null);

  const stocks = [
    {
      id: '1',
      symbol: 'TCS',
      name: 'Tata Consultancy Services',
      price: 3850,
      change: 2.5,
      pe: 25.3,
    },
    {
      id: '2',
      symbol: 'INFY',
      name: 'Infosys Limited',
      price: 1425,
      change: -1.2,
      pe: 22.1,
    },
    {
      id: '3',
      symbol: 'RELIANCE',
      name: 'Reliance Industries',
      price: 2850,
      change: 3.8,
      pe: 20.5,
    },
    {
      id: '4',
      symbol: 'WIPRO',
      name: 'Wipro Limited',
      price: 580,
      change: 1.5,
      pe: 18.9,
    },
  ];

  return (
    <Layout title="Stock Trading">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl shadow-lg text-white p-6 mb-6">
          <div className="flex items-center">
            <ArrowTrendingUpIcon className="w-10 h-10 mr-4" />
            <div>
              <h2 className="text-2xl font-bold">Stock Trading</h2>
              <p className="text-emerald-100">Trade stocks online with zero brokerage</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900">Symbol</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900">Company</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-900">Price (₹)</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-900">Change %</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-900">P/E Ratio</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr key={stock.id} className="border-b hover:bg-gray-50 transition-all">
                  <td className="px-6 py-4 font-bold text-emerald-600">{stock.symbol}</td>
                  <td className="px-6 py-4 text-gray-900">{stock.name}</td>
                  <td className="px-6 py-4 text-right font-semibold text-gray-900">₹{stock.price}</td>
                  <td className={`px-6 py-4 text-right font-semibold ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.change > 0 ? '+' : ''}{stock.change}%
                  </td>
                  <td className="px-6 py-4 text-right text-gray-900">{stock.pe}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="px-3 py-1 bg-emerald-600 text-white text-sm font-semibold rounded hover:bg-emerald-700">
                      Buy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default StocksPage;
