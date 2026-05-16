import React, { useState } from 'react';
import Layout from '../components/Layout';
import { DocumentTextIcon, ArrowDownTrayIcon, PrinterIcon } from '@heroicons/react/24/outline';

const PassbookPage: React.FC = () => {
  const [selectedAccount] = useState('Checking Account');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const handleDownload = () => {
    alert('Passbook download initiated. Your passbook will be ready shortly.');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Layout title="Passbook">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg text-white p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <DocumentTextIcon className="w-10 h-10 mr-4" />
              <div>
                <h2 className="text-2xl font-bold">Passbook</h2>
                <p className="text-blue-100">Download or print your passbook</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleDownload}
                className="flex items-center px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all"
              >
                <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                Download
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all"
              >
                <PrinterIcon className="w-5 h-5 mr-2" />
                Print
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-8 border-b pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Selected Account</h3>
            <p className="text-gray-600">{selectedAccount}</p>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">Total Deposits</p>
              <p className="text-3xl font-bold text-green-600">{formatCurrency(150000)}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">Total Withdrawals</p>
              <p className="text-3xl font-bold text-red-600">{formatCurrency(25000)}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">Current Balance</p>
              <p className="text-3xl font-bold text-blue-600">{formatCurrency(125000)}</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-3">About Passbook</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Complete record of all your transactions</li>
              <li>• Updated monthly</li>
              <li>• Can be downloaded as PDF or printed</li>
              <li>• Useful for loan applications and verification</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PassbookPage;
