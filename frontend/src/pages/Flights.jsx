/* eslint-disable no-unused-vars */
import { useState } from 'react';
import FlightSearchForm from '../components/FlightSearchForm';
import FlightCard from '../components/FlightCard';
import { flightsAPI, bookingsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Plane, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';

export default function Flights({ onAuthRequired }) {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const { isAuthenticated } = useAuth();

  const handleSearch = async (searchData) => {
    setLoading(true);
    setMessage({ type: '', text: '' });
    setFlights([]);

    try {
      const data = await flightsAPI.search(searchData);
      
      if (data.data) {
        setFlights(data.data);
        if (data.data.length > 0) {
          setMessage({ 
            type: 'success', 
            text: `Found ${data.data.length} available flights! Compare prices and choose the best option.` 
          });
        } else {
          setMessage({ 
            type: 'info', 
            text: 'No flights found for these dates. Try adjusting your search criteria or check different dates.' 
          });
        }
      } else {
        setMessage({ 
          type: 'error', 
          text: data.error || 'Search failed. Please check your airport codes and try again.' 
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

  const handleBook = async (flight) => {
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
        type: 'flights',
        details: flight
      });

      if (data.message) {
        setMessage({ 
          type: 'success', 
          text: '🎉 Booking created successfully! Check "My Bookings" to view all your reservations.' 
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
              <Plane className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-2">Search Flights</h1>
              <p className="text-xl text-white/90">Find the perfect flight for your journey</p>
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
          <FlightSearchForm onSearch={handleSearch} loading={loading} />
        </div>

        {/* Results */}
        {flights.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  Available Flights
                </h2>
                <p className="text-gray-600 mt-1">
                  {flights.length} {flights.length === 1 ? 'flight' : 'flights'} found
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {flights.map((flight, idx) => (
                <FlightCard 
                  key={idx} 
                  flight={flight} 
                  onBook={handleBook}
                  loading={loading}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && flights.length === 0 && !message.text && (
          <div className="mt-16 text-center">
            <div className="inline-block p-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full mb-6">
              <Plane className="w-16 h-16 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Ready to Take Off?
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Enter your travel details above to search for available flights. We'll find you the best options!
            </p>
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
              <p className="text-sm text-gray-700 font-semibold mb-3">Quick Tips:</p>
              <ul className="text-sm text-gray-600 space-y-2 text-left">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Use 3-letter airport codes (JFK, LAX, LHR)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Book in advance for better prices</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Be flexible with dates for more options</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}