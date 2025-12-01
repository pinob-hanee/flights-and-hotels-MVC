import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, CreditCard, Trash2, Plus, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [savedCards, setSavedCards] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    const cards = JSON.parse(localStorage.getItem('savedCards') || '[]');
    setSavedCards(cards);
  }, [isAuthenticated, navigate]);

  const deleteCard = (cardId) => {
    const updatedCards = savedCards.filter(card => card.id !== cardId);
    localStorage.setItem('savedCards', JSON.stringify(updatedCards));
    setSavedCards(updatedCards);
  };

  const getCardIcon = (type) => {
    if (type === 'visa') return '💳 VISA';
    if (type === 'mastercard') return '💳 Mastercard';
    if (type === 'amex') return '💳 Amex';
    return '💳 Card';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
              <User className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-2">My Profile</h1>
              <p className="text-xl text-white/90">Manage your account and payment methods</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* User Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={user?.name || ''}
                    readOnly
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={user?.email || ''}
                    readOnly
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-700"
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Member since {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>

          {/* Saved Payment Methods */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Payment Methods</h2>
              <button
                onClick={() => navigate('/payment')}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Card
              </button>
            </div>

            {savedCards.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-block p-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full mb-4">
                  <CreditCard className="w-12 h-12 text-indigo-600" />
                </div>
                <p className="text-gray-600 mb-4">No saved payment methods</p>
                <button
                  onClick={() => navigate('/payment')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                >
                  <Plus className="w-5 h-5" />
                  Add Your First Card
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {savedCards.map((card) => (
                  <div
                    key={card.id}
                    className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-indigo-300 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-lg">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {getCardIcon(card.type)} •••• {card.last4}
                        </p>
                        <p className="text-sm text-gray-600">{card.cardHolder}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <Calendar className="w-3 h-3" />
                          Expires {card.expiryMonth}/{card.expiryYear}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteCard(card.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}