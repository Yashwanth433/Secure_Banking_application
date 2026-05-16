import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { transactionService } from '../services/api';
import { ClockIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

interface Transaction {
  _id: string;
  type: string;
  description: string;
  amount: number;
  createdAt: string;
  status: string;
  fromAccountId?: string;
  toAccountId?: string;
}

const HistoryPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const data = await transactionService.getAllTransactions(currentPage, 20);
        setTransactions(data.transactions);
        setTotalPages(data.pagination.pages);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [currentPage]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const getTransactionIcon = (transaction: Transaction) => {
    const isIncoming = transaction.type === 'deposit' || (transaction.amount > 0);
    return isIncoming ? (
      <ArrowDownIcon className="w-5 h-5 text-green-600" />
    ) : (
      <ArrowUpIcon className="w-5 h-5 text-red-600" />
    );
  };

  const getTransactionColor = (transaction: Transaction) => {
    const isIncoming = transaction.type === 'deposit' || (transaction.amount > 0);
    return isIncoming ? 'text-green-600' : 'text-red-600';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading && transactions.length === 0) {
    return (
      <Layout title="Transaction History">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Transaction History">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg text-white p-6 mb-6">
          <div className="flex items-center">
            <ClockIcon className="w-10 h-10 mr-4" />
            <div>
              <h2 className="text-2xl font-bold">Transaction History</h2>
              <p className="text-blue-100">View all your transactions</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {transactions.length === 0 ? (
            <div className="p-12 text-center">
              <ClockIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-600 font-medium mb-2">No Transactions Yet</p>
              <p className="text-gray-500">Once you perform any transactions like transfers, payments, or purchases, they will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900">Type</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900">Description</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-900">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900">Date & Time</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction._id} className="border-b hover:bg-gray-50 transition-all">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getTransactionIcon(transaction)}
                          <span className="font-semibold text-gray-900 capitalize">{transaction.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700 max-w-xs truncate">{transaction.description}</td>
                      <td className={`px-6 py-4 text-right font-bold ${getTransactionColor(transaction)}`}>
                        {Math.abs(transaction.amount) > 0 && (transaction.type === 'deposit' || transaction.amount > 0 ? '+' : '-')}
                        {formatCurrency(Math.abs(transaction.amount))}
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">{formatDate(transaction.createdAt)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                          transaction.status === 'completed' || transaction.status === 'success'
                            ? 'bg-green-100 text-green-800'
                            : transaction.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg transition-all ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HistoryPage;
