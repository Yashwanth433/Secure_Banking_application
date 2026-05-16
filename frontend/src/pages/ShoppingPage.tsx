import React from 'react';
import Layout from '../components/Layout';
import { TruckIcon } from '@heroicons/react/24/outline';

const ShoppingPage: React.FC = () => {
  const products = [
    {
      id: '1',
      name: 'Premium Headphones',
      price: 4999,
      discount: 20,
      category: 'Electronics',
      rating: 4.5,
    },
    {
      id: '2',
      name: 'Wireless Mouse',
      price: 899,
      discount: 15,
      category: 'Electronics',
      rating: 4.2,
    },
    {
      id: '3',
      name: 'USB-C Cable',
      price: 399,
      discount: 25,
      category: 'Accessories',
      rating: 4.7,
    },
    {
      id: '4',
      name: 'Phone Stand',
      price: 599,
      discount: 30,
      category: 'Accessories',
      rating: 4.4,
    },
    {
      id: '5',
      name: 'Laptop Sleeve',
      price: 1299,
      discount: 40,
      category: 'Bags',
      rating: 4.6,
    },
    {
      id: '6',
      name: 'Screen Protector',
      price: 299,
      discount: 50,
      category: 'Protection',
      rating: 4.3,
    },
  ];

  return (
    <Layout title="Shopping">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-lime-600 to-lime-700 rounded-2xl shadow-lg text-white p-6 mb-6">
          <div className="flex items-center">
            <TruckIcon className="w-10 h-10 mr-4" />
            <div>
              <h2 className="text-2xl font-bold">Tech Shopping</h2>
              <p className="text-lime-100">Buy tech products with exclusive deals</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group">
              <div className="bg-gradient-to-r from-lime-100 to-lime-50 h-40 flex items-center justify-center relative">
                {product.discount > 0 && (
                  <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    -{product.discount}%
                  </div>
                )}
                <TruckIcon className="w-16 h-16 text-lime-400" />
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-600 mb-1">{product.category}</p>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm text-gray-500 line-through">₹{Math.round(product.price / (1 - product.discount / 100))}</p>
                    <p className="text-lg font-bold text-lime-600">₹{product.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-yellow-500">★ {product.rating}</p>
                  </div>
                </div>
                <button className="w-full py-2 px-4 bg-gradient-to-r from-lime-600 to-lime-700 text-white font-semibold rounded-lg hover:shadow-md">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ShoppingPage;
