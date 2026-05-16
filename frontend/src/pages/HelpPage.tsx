import React, { useState } from 'react';
import Layout from '../components/Layout';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  ChatBubbleLeftIcon,
  ClockIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  CheckCircleIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const HelpPage: React.FC = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    issue: '',
    category: 'general'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.issue) {
      toast.error('Please fill all fields');
      return;
    }
    toast.success('Your issue has been submitted. Our support team will contact you soon!');
    setContactForm({
      name: '',
      email: '',
      issue: '',
      category: 'general'
    });
  };

  const supportChannels = [
    {
      icon: PhoneIcon,
      title: 'Phone Support',
      description: 'Speak directly with our support team',
      details: '1-800-SECURE-BANK',
      availability: '24/7 Available',
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-50'
    },
    {
      icon: EnvelopeIcon,
      title: 'Email Support',
      description: 'Send us your queries via email',
      details: 'support@securebank.com',
      availability: 'Response within 24 hours',
      color: 'from-purple-600 to-purple-700',
      bgColor: 'bg-purple-50'
    },
    {
      icon: ChatBubbleLeftIcon,
      title: 'Live Chat',
      description: 'Chat with our support agent now',
      details: 'Available on website',
      availability: '9 AM - 9 PM (Mon-Fri)',
      color: 'from-green-600 to-emerald-700',
      bgColor: 'bg-green-50'
    }
  ];

  const faqItems = [
    {
      question: 'How do I reset my password?',
      answer: 'Go to the login page and click "Forgot password". Enter your email address and follow the instructions sent to your registered email.'
    },
    {
      question: 'What are the charges for fund transfers?',
      answer: 'Domestic transfers are free for the first 10 transfers per month. After that, a nominal fee of ₹10 per transfer applies.'
    },
    {
      question: 'How long does it take for a transfer to reflect?',
      answer: 'Most transfers are completed within 5-30 minutes. NEFT transfers may take up to 1 hour during business hours.'
    },
    {
      question: 'Is my account information secure?',
      answer: 'Yes, we use military-grade encryption and follow international security standards to protect your data.'
    },
    {
      question: 'How can I update my profile information?',
      answer: 'Go to Settings > Profile Information and update the required details. You may need to verify your identity for certain changes.'
    },
    {
      question: 'What should I do if I notice suspicious activity?',
      answer: 'Contact our support team immediately at 1-800-SECURE-BANK or email support@securebank.com. We can block your account temporarily.'
    }
  ];

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <Layout title="Help & Support">
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg text-white p-8">
          <div className="flex items-center gap-4 mb-4">
            <QuestionMarkCircleIcon className="w-8 h-8" />
            <h1 className="text-3xl font-bold">How Can We Help You?</h1>
          </div>
          <p className="text-blue-100">We're here to help with any questions or issues you might have. Reach out to us through any of our support channels.</p>
        </div>

        {/* Support Channels */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportChannels.map((channel, index) => (
              <div 
                key={index}
                className={`${channel.bgColor} border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all transform hover:scale-105`}
              >
                <div className={`bg-gradient-to-br ${channel.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <channel.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{channel.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{channel.description}</p>
                <div className="bg-white rounded-lg p-3 mb-3">
                  <p className="text-gray-900 font-semibold text-sm">{channel.details}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ClockIcon className="w-4 h-4" />
                  <span>{channel.availability}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit Your Issue</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">Issue Category</label>
              <select
                name="category"
                value={contactForm.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
              >
                <option value="general">General Inquiry</option>
                <option value="transaction">Transaction Issue</option>
                <option value="account">Account Issue</option>
                <option value="security">Security Concern</option>
                <option value="card">Card Related</option>
                <option value="loan">Loan Related</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">Describe Your Issue</label>
              <textarea
                name="issue"
                value={contactForm.issue}
                onChange={handleInputChange}
                placeholder="Please describe your issue in detail..."
                rows={5}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <CheckCircleIcon className="w-5 h-5" />
              Submit Issue
            </button>
          </form>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 transition-all">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-all"
                >
                  <h3 className="text-base font-semibold text-gray-900 text-left">{item.question}</h3>
                  <div className={`transform transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </button>
                {expandedFaq === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border-2 border-indigo-200 p-8">
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-indigo-600 to-blue-600 p-3 rounded-lg flex-shrink-0">
              <SparklesIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Quick Tips</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                  Keep your password secure and never share it with anyone
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                  Always verify URLs before logging in to avoid phishing
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                  Check your account regularly for any unauthorized transactions
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                  Use strong, unique passwords with a mix of characters
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HelpPage;
