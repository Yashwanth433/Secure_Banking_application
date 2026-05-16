import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  HomeIcon, 
  ArrowsRightLeftIcon, 
  CreditCardIcon,
  DocumentTextIcon,
  ArrowRightOnRectangleIcon,
  ClockIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  BookOpenIcon,
  CheckIcon,
  PhoneIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const services = [
    { name: 'Bank Transfer', path: '/transfer' },
    { name: 'Pay Bills', path: '/pay-bills' },
    { name: 'Recharge', path: '/recharge' },
    { name: 'UPI Payments', path: '/upi-payment' },
    { name: 'Loans', path: '/loans' },
    { name: 'Cards', path: '/cards' },
    { name: 'Tax Payments', path: '/tax-payments' },
    { name: 'Fast Tag', path: '/fastag' },
    { name: 'Insurance', path: '/insurance' },
    { name: 'Mutual Funds', path: '/mutual-funds' },
    { name: 'Stocks', path: '/stocks' },
    { name: 'EMI', path: '/emi' },
    { name: 'Shopping', path: '/shopping' }
  ];

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleServiceSearch = (path: string) => {
    navigate(path);
    setSearchQuery('');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 shadow-xl">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-white">SecureBank</h1>
          <p className="text-sm text-gray-400 mt-2">Welcome, {user?.firstName}</p>
        </div>
        
        <nav className="mt-8 px-3 space-y-2">
          <Link 
            to="/dashboard" 
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-all duration-200"
          >
            <HomeIcon className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link 
            to="/transfer" 
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-all duration-200"
          >
            <ArrowsRightLeftIcon className="w-5 h-5 mr-3" />
            Transfer Money
          </Link>
          <Link 
            to="/history" 
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-all duration-200"
          >
            <ClockIcon className="w-5 h-5 mr-3" />
            History
          </Link>
          <Link 
            to="/passbook" 
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-all duration-200"
          >
            <BookOpenIcon className="w-5 h-5 mr-3" />
            Passbook
          </Link>
          <Link 
            to="/cheque-book" 
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-all duration-200"
          >
            <CheckIcon className="w-5 h-5 mr-3" />
            Cheque Book
          </Link>
          <Link 
            to="/settings" 
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-all duration-200"
          >
            <Cog6ToothIcon className="w-5 h-5 mr-3" />
            Settings
          </Link>
        </nav>

        <div className="absolute bottom-0 w-64 p-6 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-all duration-200"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
          <div className="px-8 py-6 flex justify-between items-center gap-6">
            <h2 className="text-2xl font-bold text-gray-800 min-w-fit">{title}</h2>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md relative">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                
                {/* Search Results Dropdown */}
                {searchQuery && filteredServices.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                    {filteredServices.map((service) => (
                      <button
                        key={service.path}
                        onClick={() => handleServiceSearch(service.path)}
                        className="w-full text-left px-4 py-2 hover:bg-blue-50 transition-all border-b border-gray-200 last:border-b-0 text-sm font-medium text-gray-900"
                      >
                        {service.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Help and Profile */}
            <div className="flex items-center space-x-3">
              <Link 
                to="/help" 
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-all duration-200 group"
                title="Call Support"
              >
                <PhoneIcon className="w-6 h-6 text-green-600 group-hover:text-green-700" />
              </Link>
              
              <Link 
                to="/profile" 
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900">{user?.firstName} {user?.lastName}</p>
                </div>
              </Link>
            </div>
          </div>
        </header>
        
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;