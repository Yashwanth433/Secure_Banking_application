import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Account } from '../types';
import { accountService } from '../services/api';
import { 
  CreditCardIcon, 
  BanknotesIcon, 
  ArrowTrendingUpIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  DocumentTextIcon,
  BellIcon,
  ArrowsRightLeftIcon,
  PhoneIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  HomeIcon,
  TicketIcon,
  TagIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  FolderIcon,
  TruckIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const Dashboard: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await accountService.getAccounts();
        setAccounts(data);
      } catch (error) {
        console.error('Failed to fetch accounts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'checking':
        return <CreditCardIcon className="w-8 h-8 text-white" />;
      case 'savings':
        return <BanknotesIcon className="w-8 h-8 text-white" />;
      case 'credit':
        return <ArrowTrendingUpIcon className="w-8 h-8 text-white" />;
      default:
        return <CreditCardIcon className="w-8 h-8 text-white" />;
    }
  };

  const getAccountGradient = (type: string) => {
    switch (type) {
      case 'checking':
        return 'from-blue-600 to-blue-700 hover:shadow-blue-500/50';
      case 'savings':
        return 'from-green-600 to-emerald-700 hover:shadow-green-500/50';
      case 'credit':
        return 'from-purple-600 to-indigo-700 hover:shadow-purple-500/50';
      default:
        return 'from-gray-600 to-gray-700 hover:shadow-gray-500/50';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const TrendingUpIcon = ArrowTrendingUpIcon;

  const services = [
    { name: 'Bank Transfer', description: 'Send money to any account instantly', icon: ArrowsRightLeftIcon, path: '/transfer', color: 'from-blue-600 to-blue-700', bgColor: 'bg-blue-50' },
    { name: 'Pay Bills', description: 'Pay utilities, phone, internet bills', icon: CreditCardIcon, path: '/pay-bills', color: 'from-purple-600 to-purple-700', bgColor: 'bg-purple-50' },
    { name: 'Recharge', description: 'Mobile and DTH recharge instantly', icon: PhoneIcon, path: '/recharge', color: 'from-green-600 to-emerald-700', bgColor: 'bg-green-50' },
    { name: 'UPI Payments', description: 'Fast & secure peer-to-peer payments', icon: PaperAirplaneIcon, path: '/upi-payment', color: 'from-pink-600 to-rose-700', bgColor: 'bg-pink-50' },
    { name: 'Loans', description: 'Affordable personal & home loans', icon: HomeIcon, path: '/loans', color: 'from-indigo-600 to-indigo-700', bgColor: 'bg-indigo-50' },
    { name: 'Cards', description: 'Credit & debit cards management', icon: CreditCardIcon, path: '/cards', color: 'from-orange-600 to-orange-700', bgColor: 'bg-orange-50' },
    { name: 'Tax Payments', description: 'Easy income tax & GST filing', icon: DocumentTextIcon, path: '/tax-payments', color: 'from-red-600 to-red-700', bgColor: 'bg-red-50' },
    { name: 'Fast Tag', description: 'Seamless highway toll payments', icon: TicketIcon, path: '/fastag', color: 'from-cyan-600 to-cyan-700', bgColor: 'bg-cyan-50' },
    { name: 'Insurance', description: 'Comprehensive insurance coverage', icon: ShieldCheckIcon, path: '/insurance', color: 'from-teal-600 to-teal-700', bgColor: 'bg-teal-50' }
  ];

  if (loading) {
    return (
      <Layout title="Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard">
      <div className="space-y-8">
        {/* Total Balance Card */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 rounded-2xl shadow-2xl text-white p-8 transform hover:shadow-2xl transition-all hover:scale-105">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-2">Total Balance</p>
              <h2 className="text-4xl font-bold mb-2">{formatCurrency(totalBalance)}</h2>
              <p className="text-blue-100 text-sm">Across all your accounts</p>
            </div>
            <div className="opacity-20">
              <BanknotesIcon className="w-16 h-16" />
            </div>
          </div>
        </div>

        {/* Your Accounts Section */}
        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Your Accounts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accounts.map((account) => (
              <div 
                key={account._id} 
                className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-lg transform hover:scale-102 transition-all duration-300 overflow-hidden group"
              >
                {/* Card Header with Icon */}
                <div className={`bg-gradient-to-r ${getAccountGradient(account.accountType)} p-4 text-white`}>
                  <div className="flex items-center justify-between">
                    <div className="bg-white bg-opacity-20 p-2 rounded-lg group-hover:bg-opacity-30 transition-all">
                      {getAccountIcon(account.accountType)}
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      account.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {account.status.toUpperCase()}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold mt-3 capitalize">
                    {account.accountType} Account
                  </h4>
                  <p className="text-white text-opacity-80 text-xs">
                    •••• {account.accountNumber.slice(-4)}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-4">
                  <div className="mb-3">
                    <p className="text-gray-600 text-xs mb-1">Balance</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(account.balance)}
                    </p>
                  </div>

                  {account.interestRate && (
                    <div className="mb-3 pb-3 border-b border-gray-200">
                      <p className="text-xs text-gray-600">Interest Rate</p>
                      <p className="text-base font-semibold text-green-600">
                        {(account.interestRate * 100).toFixed(2)}%
                      </p>
                    </div>
                  )}

                  <Link
                    to={`/account/${account._id}`}
                    className="inline-flex items-center justify-center w-full px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium text-sm rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                  >
                    <EyeIcon className="w-4 h-4 mr-2" />
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.name}
                to={service.path}
                className={`group ${service.bgColor} border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all transform hover:scale-105 hover:border-gray-300`}
              >
                <div className={`bg-gradient-to-br ${service.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:shadow-md transition-all`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-base font-semibold text-gray-900 mb-2">{service.name}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Account Tips */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Account Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-200">
              <BanknotesIcon className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">Earn Interest</h4>
                <p className="text-sm text-gray-600 mt-1">Your savings account earns 2% annual interest</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-green-50 rounded-lg border border-green-200">
              <ArrowTrendingUpIcon className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">Secure Transfers</h4>
                <p className="text-sm text-gray-600 mt-1">All transfers are protected with encryption</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;