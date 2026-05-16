import React, { useState } from 'react';
import Layout from '../components/Layout';
import { FolderIcon } from '@heroicons/react/24/outline';

const EMIPage: React.FC = () => {
  const [selectedEMI, setSelectedEMI] = useState<number | null>(null);

  const emis = [
    {
      id: 1,
      loanType: 'Personal Loan',
      amount: 500000,
      duration: 60,
      monthlyEMI: 9500,
      interest: 70000,
      status: 'Active',
    },
    {
      id: 2,
      loanType: 'Home Loan',
      amount: 3000000,
      duration: 240,
      monthlyEMI: 15200,
      interest: 1648000,
      status: 'Active',
    },
    {
      id: 3,
      loanType: 'Auto Loan',
      amount: 800000,
      duration: 60,
      monthlyEMI: 14500,
      interest: 70000,
      status: 'Completed',
    },
  ];

  return (
    <Layout title="EMI Management">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-fuchsia-600 to-fuchsia-700 rounded-2xl shadow-lg text-white p-6 mb-6">
          <div className="flex items-center">
            <FolderIcon className="w-10 h-10 mr-4" />
            <div>
              <h2 className="text-2xl font-bold">EMI Management</h2>
              <p className="text-fuchsia-100">Track and manage your loan EMIs</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {emis.map((emi) => (
            <div key={emi.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border-l-4 border-fuchsia-600">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-600">Loan Type</p>
                  <p className="text-lg font-bold text-gray-900">{emi.loanType}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Loan Amount</p>
                  <p className="text-lg font-bold text-gray-900">₹{emi.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Monthly EMI</p>
                  <p className="text-lg font-bold text-fuchsia-600">₹{emi.monthlyEMI.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Duration</p>
                  <p className="text-lg font-bold text-gray-900">{emi.duration} months</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Total Interest</p>
                  <p className="text-lg font-bold text-gray-900">₹{emi.interest.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Status</p>
                  <p className={`text-lg font-bold ${emi.status === 'Active' ? 'text-green-600' : 'text-gray-600'}`}>
                    {emi.status}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 py-2 px-4 bg-fuchsia-600 text-white font-semibold rounded-lg hover:bg-fuchsia-700">
                  View Details
                </button>
                {emi.status === 'Active' && (
                  <button className="flex-1 py-2 px-4 bg-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-300">
                    Pay EMI
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default EMIPage;
