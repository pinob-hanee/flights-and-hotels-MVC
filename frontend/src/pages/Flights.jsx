/* eslint-disable no-unused-vars */
import { useState } from 'react';
import FlightSearchForm from '../components/FlightSearchForm';
import FlightCard from '../components/FlightCard';
import { flightsAPI, bookingsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Flights({ onAuthRequired }) {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { isAuthenticated } = useAuth();

  const handleSearch = async (searchData) => {
    setLoading(true);
    setMessage('');
    setFlights([]);

    try {
      const data = await flightsAPI.search(searchData);
      
      if (data.data) {
        setFlights(data.data);
        setMessage(data.data.length > 0 
          ? `Found ${data.data.length} flights` 
          : 'No flights found. Try different dates or airports.'
        );
      } else {
        setMessage(data.error || 'Search failed');
      }
    } catch (err) {
      setMessage('Connection error. Make sure the backend is running.');
    }

    setLoading(false);
  };

  const handleBook = async (flight) => {
    if (!isAuthenticated) {
      setMessage('Please login to make a booking');
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
        setMessage('Booking created successfully! Check "My Bookings" to see it.');
      } else {
        setMessage(data.error || 'Booking failed');
      }
    } catch (err) {
      setMessage('Connection error');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Search Flights</h1>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('success') || message.includes('Found')
              ? 'bg-green-100 border border-green-300 text-green-800'
              : message.includes('error') || message.includes('failed')
              ? 'bg-red-100 border border-red-300 text-red-800'
              : 'bg-blue-100 border border-blue-300 text-blue-800'
          }`}>
            {message}
          </div>
        )}

        <FlightSearchForm onSearch={handleSearch} loading={loading} />

        {flights.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Available Flights ({flights.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {!loading && flights.length === 0 && !message && (
          <div className="mt-16 text-center text-gray-500">
            <p className="text-lg">Enter your travel details to search for flights</p>
            <p className="text-sm mt-2">Example: JFK to LAX</p>
          </div>
        )}
      </div>
    </div>
  );
}