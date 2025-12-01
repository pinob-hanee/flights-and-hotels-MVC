import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Lock, User, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state?.bookingDetails;
  
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    saveCard: false
  });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  const detectCardType = (number) => {
    const cleaned = number.replace(/\s/g, '');
    if (/^4/.test(cleaned)) return 'visa';
    if (/^5[1-5]/.test(cleaned)) return 'mastercard';
    if (/^3[47]/.test(cleaned)) return 'amex';
    return 'unknown';
  };

  const validateForm = () => {
    const newErrors = {};
    
    const cleanedNumber = formData.cardNumber.replace(/\s/g, '');
    if (!cleanedNumber || cleanedNumber.length < 13) {
      newErrors.cardNumber = 'Invalid card number';
    }
    
    if (!formData.cardHolder.trim()) {
      newErrors.cardHolder = 'Card holder name is required';
    }
    
    if (!formData.expiryMonth || !formData.expiryYear) {
      newErrors.expiry = 'Expiry date is required';
    }
    
    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = 'Invalid CVV';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Save card if requested
    if (formData.saveCard) {
      const savedCards = JSON.parse(localStorage.getItem('savedCards') || '[]');
      savedCards.push({
        id: Date.now(),
        last4: formData.cardNumber.slice(-4),
        cardHolder: formData.cardHolder,
        expiryMonth: formData.expiryMonth,
        expiryYear: formData.expiryYear,
        type: detectCardType(formData.cardNumber),
        addedDate: new Date().toISOString()
      });
      localStorage.setItem('savedCards', JSON.stringify(savedCards));
    }
    
    // Process booking with payment
    const result = await fetch('http://localhost:2000/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        type: bookingDetails?.type,
        details: bookingDetails?.details
      })
    });
    
    setProcessing(false);
    
    if (result.ok) {
      navigate('/bookings', { 
        state: { 
          message: '🎉 Payment successful! Your booking has been confirmed.' 
        } 
      });
    }
  };

  const cardType = detectCardType(formData.cardNumber);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Payment Details</h2>
                <p className="text-sm text-gray-500">Enter your card information</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Card Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={(e) => {
                      const formatted = formatCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16));
                      setFormData({ ...formData, cardNumber: formatted });
                    }}
                    className={`w-full pl-4 pr-12 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.cardNumber ? 'border-red-300' : 'border-gray-200'
                    }`}
                  />
                  {cardType === 'visa' && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 font-bold text-sm">VISA</div>
                  )}
                  {cardType === 'mastercard' && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-600 font-bold text-sm">MC</div>
                  )}
                </div>
                {errors.cardNumber && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              {/* Card Holder */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Card Holder Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="JOHN DOE"
                    value={formData.cardHolder}
                    onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value.toUpperCase() })}
                    className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.cardHolder ? 'border-red-300' : 'border-gray-200'
                    }`}
                  />
                </div>
                {errors.cardHolder && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.cardHolder}
                  </p>
                )}
              </div>

              {/* Expiry & CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={formData.expiryMonth}
                      onChange={(e) => setFormData({ ...formData, expiryMonth: e.target.value })}
                      className={`px-3 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        errors.expiry ? 'border-red-300' : 'border-gray-200'
                      }`}
                    >
                      <option value="">MM</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                        <option key={m} value={m.toString().padStart(2, '0')}>
                          {m.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                    <select
                      value={formData.expiryYear}
                      onChange={(e) => setFormData({ ...formData, expiryYear: e.target.value })}
                      className={`px-3 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        errors.expiry ? 'border-red-300' : 'border-gray-200'
                      }`}
                    >
                      <option value="">YY</option>
                      {Array.from({ length: 10 }, (_, i) => 25 + i).map(y => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                  {errors.expiry && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.expiry}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    maxLength="4"
                    value={formData.cvv}
                    onChange={(e) => setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '') })}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.cvv ? 'border-red-300' : 'border-gray-200'
                    }`}
                  />
                  {errors.cvv && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.cvv}
                    </p>
                  )}
                </div>
              </div>

              {/* Save Card */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.saveCard}
                  onChange={(e) => setFormData({ ...formData, saveCard: e.target.checked })}
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">Save card for future bookings</span>
              </label>

              <button
                onClick={handleSubmit}
                disabled={processing}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl hover:shadow-xl hover:scale-105 transition-all font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Complete Payment
                  </>
                )}
              </button>

              <div className="flex items-start gap-2 p-4 bg-green-50 rounded-xl">
                <Lock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-green-800">Secure Payment</p>
                  <p className="text-xs text-green-700 mt-1">
                    Your payment information is encrypted and secure
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Booking Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Booking Type</span>
                  <span className="font-semibold capitalize">{bookingDetails?.type || 'Flight'}</span>
                </div>
                
                {bookingDetails?.details?.price && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Base Price</span>
                      <span className="font-semibold">
                        {bookingDetails.details.price.total} {bookingDetails.details.price.currency}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Service Fee</span>
                      <span className="font-semibold">0.00 {bookingDetails.details.price.currency}</span>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between">
                        <span className="text-lg font-bold text-gray-800">Total</span>
                        <span className="text-2xl font-bold text-indigo-600">
                          {bookingDetails.details.price.total} {bookingDetails.details.price.currency}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-6 p-4 bg-indigo-50 rounded-xl">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-indigo-800">Free Cancellation</p>
                    <p className="text-xs text-indigo-700 mt-1">
                      Cancel up to 24 hours before departure
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}