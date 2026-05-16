import React, { useState } from 'react';
import Layout from '../components/Layout';
import { CheckIcon, TruckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ChequeBookRequest {
  id: string;
  requestDate: string;
  leaves: number;
  status: string;
  deliveryStatus: string;
}

const ChequeBookPage: React.FC = () => {
  const [requests, setRequests] = useState<ChequeBookRequest[]>([]);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [leaves, setLeaves] = useState('50');

  const handleRequestChequeBook = () => {
    const newRequest: ChequeBookRequest = {
      id: String(requests.length + 1),
      requestDate: new Date().toLocaleDateString(),
      leaves: parseInt(leaves),
      status: 'Pending',
      deliveryStatus: 'In Progress'
    };
    setRequests([...requests, newRequest]);
    setShowRequestForm(false);
    setLeaves('50');
    alert('Cheque book request submitted successfully!');
  };

  return (
    <Layout title="Cheque Book">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl shadow-lg text-white p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CheckIcon className="w-10 h-10 mr-4" />
              <div>
                <h2 className="text-2xl font-bold">Cheque Book Management</h2>
                <p className="text-green-100">Request and manage your cheque books</p>
              </div>
            </div>
            {!showRequestForm && (
              <button
                onClick={() => setShowRequestForm(true)}
                className="px-6 py-2 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-all"
              >
                Request Cheque Book
              </button>
            )}
          </div>
        </div>

        {/* Request Form */}
        {showRequestForm && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Request New Cheque Book</h3>
              <button
                onClick={() => setShowRequestForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of Leaves
                </label>
                <select
                  value={leaves}
                  onChange={(e) => setLeaves(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="25">25 Leaves</option>
                  <option value="50">50 Leaves (Recommended)</option>
                  <option value="100">100 Leaves</option>
                </select>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  Your cheque book will be delivered to your registered address within 7-10 business days
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleRequestChequeBook}
                  className="flex-1 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all"
                >
                  Submit Request
                </button>
                <button
                  onClick={() => setShowRequestForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Cheque Book Requests */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {requests.length === 0 ? (
            <div className="p-12 text-center">
              <CheckIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-600 font-medium mb-2">No Active Requests</p>
              <p className="text-gray-500 mb-4">Request a cheque book to get started</p>
              <button
                onClick={() => setShowRequestForm(true)}
                className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all"
              >
                Request Now
              </button>
            </div>
          ) : (
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Your Requests</h3>
              <div className="space-y-4">
                {requests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Request Date: {request.requestDate}</p>
                        <p className="text-lg font-semibold text-gray-900 mt-2">{request.leaves} Leaves Cheque Book</p>
                        <div className="flex gap-4 mt-3">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            request.status === 'Pending' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {request.status}
                          </span>
                          <span className="flex items-center px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                            <TruckIcon className="w-4 h-4 mr-1" />
                            {request.deliveryStatus}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ChequeBookPage;
