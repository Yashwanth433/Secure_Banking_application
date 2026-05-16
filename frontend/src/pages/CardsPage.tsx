import React, { useState } from 'react';
import Layout from '../components/Layout';
import { CreditCardIcon } from '@heroicons/react/24/outline';

const CardsPage: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const cards = [
    {
      id: '1',
      name: 'Premium Credit Card',
      benefits: ['0% interest for 45 days', '5% cashback on dining', 'Lounge access'],
      limit: 500000,
      fee: 499,
    },
    {
      id: '2',
      name: 'Travel Card',
      benefits: ['Free airport transfers', 'Travel insurance', 'Fuel surcharge waiver'],
      limit: 300000,
      fee: 299,
    },
    {
      id: '3',
      name: 'Cashback Card',
      benefits: ['1.5% cashback on all spends', 'No annual fee for 2 years', 'Rewards program'],
      limit: 250000,
      fee: 0,
    },
  ];

  return (
    <Layout title="Credit Cards">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl shadow-lg text-white p-6 mb-6">
          <div className="flex items-center">
            <CreditCardIcon className="w-10 h-10 mr-4" />
            <div>
              <h2 className="text-2xl font-bold">Credit Cards</h2>
              <p className="text-orange-100">Choose the card that suits you best</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer border-2 border-transparent hover:border-orange-500"
              onClick={() => setSelectedCard(card.id)}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">{card.name}</h3>
              <div className="mb-4">
                <p className="text-sm text-gray-600">Credit Limit</p>
                <p className="text-2xl font-bold text-orange-600">₹{card.limit.toLocaleString()}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-600">Annual Fee</p>
                <p className="text-xl font-bold text-gray-900">
                  {card.fee === 0 ? 'FREE' : `₹${card.fee}`}
                </p>
              </div>
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Key Benefits</p>
                <ul className="space-y-1">
                  {card.benefits.map((benefit, idx) => (
                    <li key={idx} className="text-sm text-gray-700">✓ {benefit}</li>
                  ))}
                </ul>
              </div>
              <button className="w-full py-2 px-4 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-semibold rounded-lg hover:shadow-md">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CardsPage;
