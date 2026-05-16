import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import AccountDetails from './pages/AccountDetails';
import TransferPage from './pages/TransferPage';
import ProfilePage from './pages/ProfilePage';
import PayBillsPage from './pages/PayBillsPage';
import DepositCheckPage from './pages/DepositCheckPage';
import RechargePage from './pages/RechargePage';
import UPIPaymentPage from './pages/UPIPaymentPage';
import LoansPage from './pages/LoansPage';
import CardsPage from './pages/CardsPage';
import TaxPaymentsPage from './pages/TaxPaymentsPage';
import FastagPage from './pages/FastagPage';
import InsurancePage from './pages/InsurancePage';
import MutualFundsPage from './pages/MutualFundsPage';
import StocksPage from './pages/StocksPage';
import EMIPage from './pages/EMIPage';
import ShoppingPage from './pages/ShoppingPage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';
import PassbookPage from './pages/PassbookPage';
import ChequeBookPage from './pages/ChequeBookPage';
import HelpPage from './pages/HelpPage';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route 
            path="/login" 
            element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/register" 
            element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/account/:accountId" 
            element={isAuthenticated ? <AccountDetails /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/transfer" 
            element={isAuthenticated ? <TransferPage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/profile" 
            element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/pay-bills" 
            element={isAuthenticated ? <PayBillsPage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/deposit-check" 
            element={isAuthenticated ? <DepositCheckPage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/recharge" 
            element={isAuthenticated ? <RechargePage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/upi-payment" 
            element={isAuthenticated ? <UPIPaymentPage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/loans" 
            element={isAuthenticated ? <LoansPage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/cards" 
            element={isAuthenticated ? <CardsPage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/tax-payments" 
            element={isAuthenticated ? <TaxPaymentsPage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/fastag" 
            element={isAuthenticated ? <FastagPage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/insurance" 
            element={isAuthenticated ? <InsurancePage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/mutual-funds" 
            element={isAuthenticated ? <MutualFundsPage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/stocks" 
            element={isAuthenticated ? <StocksPage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/emi" 
            element={isAuthenticated ? <EMIPage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/shopping" 
            element={isAuthenticated ? <ShoppingPage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/passbook" 
            element={isAuthenticated ? <PassbookPage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/cheque-book" 
            element={isAuthenticated ? <ChequeBookPage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/history" 
            element={isAuthenticated ? <HistoryPage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/settings" 
            element={isAuthenticated ? <SettingsPage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/help" 
            element={isAuthenticated ? <HelpPage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/" 
            element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;