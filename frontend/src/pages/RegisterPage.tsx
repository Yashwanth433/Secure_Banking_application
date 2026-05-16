import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { authService } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { ExclamationTriangleIcon, CheckCircleIcon, UserGroupIcon } from '@heroicons/react/24/outline';

interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

const RegisterPage: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<RegisterForm>();
  const { login } = useAuth();
  const navigate = useNavigate();
  const password = watch('password');
  const [serverErrors, setServerErrors] = useState<string[]>([]);

  const onSubmit = async (data: RegisterForm) => {
    try {
      setServerErrors([]);
      const { confirmPassword, ...registerData } = data;
      const response = await authService.register(registerData);
      login(response.token, response.user);
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (error: any) {
      setServerErrors([]);
      let errorMessages: string[] = [];
      
      // Handle different error response formats
      if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        // Array of error messages
        errorMessages = error.response.data.errors;
      } else if (error.response?.data?.error) {
        // Single error message string
        errorMessages = [error.response.data.error];
      } else if (error.message) {
        // Network or other error
        errorMessages = [error.message];
      } else {
        errorMessages = ['Registration failed. Please try again.'];
      }
      
      setServerErrors(errorMessages);
      
      // Show each error as a separate toast
      errorMessages.forEach(msg => {
        toast.error(msg, { duration: 4000 });
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 px-4 py-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob"></div>
      <div className="absolute -bottom-32 right-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Card Container */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 space-y-8 border border-white/20">
          {/* Header Section */}
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl blur opacity-75"></div>
                <div className="relative bg-gradient-to-br from-blue-600 to-indigo-600 p-4 rounded-2xl">
                  <UserGroupIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Create Account</h1>
            <p className="text-gray-600 text-sm">Join SecureBank and manage your finances with confidence</p>
            <p className="text-gray-500 text-xs">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700 transition">
                Sign in here
              </Link>
            </p>
          </div>

          {/* Error Messages */}
          {serverErrors.length > 0 && (
            <div className="rounded-2xl bg-red-50 border-2 border-red-200 p-4 animate-pulse">
              <div className="flex items-start gap-3">
                <ExclamationTriangleIcon className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-red-800 mb-2">Registration Error</h3>
                  <ul className="text-sm text-red-700 space-y-1">
                    {serverErrors.map((error, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-red-600">•</span>
                        <span>{error}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Form Section */}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Personal Information Section */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-800">
                    First Name
                  </label>
                  <input
                    {...register('firstName', { required: 'First name is required' })}
                    type="text"
                    placeholder="John"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 bg-gray-50 focus:bg-white font-medium"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600 font-medium">{errors.firstName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-sm font-semibold text-gray-800">
                    Last Name
                  </label>
                  <input
                    {...register('lastName', { required: 'Last name is required' })}
                    type="text"
                    placeholder="Doe"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 bg-gray-50 focus:bg-white font-medium"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600 font-medium">{errors.lastName.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
                    Email Address
                  </label>
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 bg-gray-50 focus:bg-white font-medium"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 font-medium">{errors.email.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-800">
                      Phone Number
                    </label>
                    <input
                      {...register('phoneNumber', { required: 'Phone number is required' })}
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 bg-gray-50 focus:bg-white font-medium"
                    />
                    {errors.phoneNumber && (
                      <p className="mt-1 text-sm text-red-600 font-medium">{errors.phoneNumber.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-gray-800">
                      Date of Birth
                    </label>
                    <input
                      {...register('dateOfBirth', { required: 'Date of birth is required' })}
                      type="date"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 bg-gray-50 focus:bg-white font-medium"
                    />
                    {errors.dateOfBirth && (
                      <p className="mt-1 text-sm text-red-600 font-medium">{errors.dateOfBirth.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Security Information Section */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                Security
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
                    Password
                  </label>
                  <input
                    {...register('password', { 
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters'
                      }
                    })}
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 bg-gray-50 focus:bg-white font-medium"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600 font-medium">{errors.password.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-800">
                    Confirm Password
                  </label>
                  <input
                    {...register('confirmPassword', { 
                      required: 'Please confirm your password',
                      validate: value => value === password || 'Passwords do not match'
                    })}
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 bg-gray-50 focus:bg-white font-medium"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600 font-medium">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Address Information Section */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                Address Information
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="address.street" className="block text-sm font-semibold text-gray-800">
                    Street Address
                  </label>
                  <input
                    {...register('address.street', { required: 'Street address is required' })}
                    type="text"
                    placeholder="123 Main Street"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 bg-gray-50 focus:bg-white font-medium"
                  />
                  {errors.address?.street && (
                    <p className="mt-1 text-sm text-red-600 font-medium">{errors.address.street.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="address.city" className="block text-sm font-semibold text-gray-800">
                      City
                    </label>
                    <input
                      {...register('address.city', { required: 'City is required' })}
                      type="text"
                      placeholder="New York"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 bg-gray-50 focus:bg-white font-medium"
                    />
                    {errors.address?.city && (
                      <p className="mt-1 text-sm text-red-600 font-medium">{errors.address.city.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="address.state" className="block text-sm font-semibold text-gray-800">
                      State
                    </label>
                    <input
                      {...register('address.state', { required: 'State is required' })}
                      type="text"
                      placeholder="NY"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 bg-gray-50 focus:bg-white font-medium"
                    />
                    {errors.address?.state && (
                      <p className="mt-1 text-sm text-red-600 font-medium">{errors.address.state.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="address.zipCode" className="block text-sm font-semibold text-gray-800">
                      ZIP Code
                    </label>
                    <input
                      {...register('address.zipCode', { required: 'ZIP code is required' })}
                      type="text"
                      placeholder="10001"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 bg-gray-50 focus:bg-white font-medium"
                    />
                    {errors.address?.zipCode && (
                      <p className="mt-1 text-sm text-red-600 font-medium">{errors.address.zipCode.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="address.country" className="block text-sm font-semibold text-gray-800">
                      Country
                    </label>
                    <input
                      {...register('address.country')}
                      type="text"
                      defaultValue="US"
                      placeholder="United States"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 bg-gray-50 focus:bg-white font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/40 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none text-base flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </>
                ) : (
                  <>
                    <CheckCircleIcon className="w-5 h-5" />
                    Create Account
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Security Info */}
          <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
            <p className="text-xs text-blue-800 font-medium leading-relaxed">
              🔒 Your information is encrypted and secure. We'll never share your personal data with third parties.
            </p>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-white text-sm mt-8 font-medium opacity-90">
          Join thousands of satisfied customers on SecureBank
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;