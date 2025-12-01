/* eslint-disable no-unused-vars */
import { useState } from 'react';
import HotelSearchForm from '../components/HotelSearchForm';
import HotelCard from '../components/HotelCard';
import { hotelsAPI, bookingsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Building2, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';

export default function Hotels({ onAuthRequired }) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const { isAuthenticated } = useAuth();

  const handleSearch = async (searchData) => {
    setLoading(true);
    setMessage({ type: '', text: '' });
    setHotels([]);

    try {
      const data = await hotelsAPI.search(searchData);
      
      if (data.data) {
        setHotels(data.data);
        if (data.data.length > 0) {
          setMessage({ 
            type: 'success', 
            text: `Found ${data.data.length} amazing hotels! Browse through and find your perfect stay.` 
          });
        } else {
          setMessage({ 
            type: 'info', 
            text: 'No hotels found for these dates. Try adjusting your search criteria or check different dates.' 
          });
        }
      } else {
        setMessage({ 
          type: 'error', 
          text: data.error || 'Search failed. Please check your city code and try again.' 
        });
      }
    } catch (err) {
      setMessage({ 
        type: 'error', 
        text: 'Connection error. Make sure the backend server is running on port 5000.' 
      });
    }

    setLoading(false);
  };

  const handleBook = async (hotel) => {
    if (!isAuthenticated) {
      setMessage({ 
        type: 'warning', 
        text: 'Please login to make a booking. Click the Login button in the navigation bar.' 
      });
      onAuthRequired();
      return;
    }

    setLoading(true);

    try {
      const data = await bookingsAPI.create({
        type: 'hotels',
        details: hotel
      });

      if (data.message) {
        setMessage({ 
          type: 'success', 
          text: '🎉 Hotel booking created successfully! Check "My Bookings" to view all your reservations.' 
        });
        
        // Scroll to top to show message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setMessage({ 
          type: 'error', 
          text: data.error || 'Booking failed. Please try again.' 
        });
      }
    } catch (err) {
      setMessage({ 
        type: 'error', 
        text: 'Connection error. Please try again.' 
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
              <Building2 className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-2">Search Hotels</h1>
              <p className="text-xl text-white/90">Discover your perfect home away from home</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Message */}
        {message.text && (
          <div className={`mb-8 p-5 rounded-xl border-2 flex items-start gap-4 animate-fade-in ${
            message.type === 'success' 
              ? 'bg-green-50 border-green-300 text-green-800'
              : message.type === 'error'
              ? 'bg-red-50 border-red-300 text-red-800'
              : message.type === 'warning'
              ? 'bg-yellow-50 border-yellow-300 text-yellow-800'
              : 'bg-blue-50 border-blue-300 text-blue-800'
          }`}>
            {message.type === 'success' && <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />}
            {message.type === 'error' && <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />}
            {message.type === 'warning' && <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />}
            {message.type === 'info' && <Sparkles className="w-6 h-6 flex-shrink-0 mt-0.5" />}
            <p className="font-medium">{message.text}</p>
          </div>
        )}

        {/* Search Form */}
        <div className="mb-12">
          <HotelSearchForm onSearch={handleSearch} loading={loading} />
        </div>

        {/* Results */}
        {hotels.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  Available Hotels
                </h2>
                <p className="text-gray-600 mt-1">
                  {hotels.length} {hotels.length === 1 ? 'hotel' : 'hotels'} found
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {hotels.map((hotel, idx) => (
                <HotelCard 
                  key={idx} 
                  hotel={hotel} 
                  onBook={handleBook}
                  loading={loading}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && hotels.length === 0 && !message.text && (
          <div className="mt-16 text-center">
            <div className="inline-block p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-6">
              <Building2 className="w-16 h-16 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Find Your Perfect Stay
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Enter your destination and dates above to discover amazing hotels. From budget-friendly to luxury options!
            </p>
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
              <p className="text-sm text-gray-700 font-semibold mb-3">Booking Tips:</p>
              <ul className="text-sm text-gray-600 space-y-2 text-left">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>Use 3-letter city codes (NYC, LON, PAR)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>Book early for special events and holidays</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>Check cancellation policies before booking</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}