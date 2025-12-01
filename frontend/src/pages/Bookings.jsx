/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plane, Building2, Calendar, DollarSign, MapPin, Clock, Package, AlertCircle } from 'lucide-react';
import { bookingsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, flights, hotels
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    const fetchBookings = async () => {
      try {
        const data = await bookingsAPI.getAll();
        
        if (Array.isArray(data)) {
          setBookings(data);
        } else {
          setError(data.error || 'Failed to fetch bookings');
        }
      } catch (err) {
        setError('Connection error. Make sure the backend is running.');
      }
      setLoading(false);
    };

    fetchBookings();
  }, [isAuthenticated, navigate]);

  const filteredBookings = bookings.filter(booking => 
    filter === 'all' || booking.type === filter
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-4 bg-white rounded-xl shadow-lg mb-4">
            <Package className="w-12 h-12 text-indigo-600 animate-pulse" />
          </div>
          <p className="text-xl text-gray-600 font-medium">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
              <Package className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-2">My Bookings</h1>
              <p className="text-xl text-white/90">Manage all your travel reservations</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-8 p-5 bg-red-50 border-2 border-red-300 text-red-800 rounded-xl flex items-start gap-4">
            <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              filter === 'all'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:shadow-md'
            }`}
          >
            All Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setFilter('flights')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
              filter === 'flights'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:shadow-md'
            }`}
          >
            <Plane className="w-4 h-4" />
            Flights ({bookings.filter(b => b.type === 'flights').length})
          </button>
          <button
            onClick={() => setFilter('hotels')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
              filter === 'hotels'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:shadow-md'
            }`}
          >
            <Building2 className="w-4 h-4" />
            Hotels ({bookings.filter(b => b.type === 'hotels').length})
          </button>
        </div>

        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="inline-block p-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full mb-6">
              <Package className="w-16 h-16 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              {filter === 'all' 
                ? "No Bookings Yet" 
                : `No ${filter === 'flights' ? 'Flight' : 'Hotel'} Bookings`}
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {filter === 'all'
                ? "You haven't made any bookings yet. Start exploring and book your next adventure!"
                : `You haven't booked any ${filter} yet. Browse our ${filter} to find great deals!`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/flights"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all font-semibold"
              >
                <Plane className="w-5 h-5" />
                Search Flights
              </Link>
              <Link
                to="/hotels"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all font-semibold"
              >
                <Building2 className="w-5 h-5" />
                Search Hotels
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredBookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100">
                {/* Header */}
                <div className={`p-4 ${
                  booking.type === 'flights'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600'
                    : 'bg-gradient-to-r from-purple-500 to-pink-600'
                }`}>
                  <div className="flex items-center gap-3 text-white">
                    <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                      {booking.type === 'flights' ? (
                        <Plane className="w-5 h-5" />
                      ) : (
                        <Building2 className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs opacity-90">Booking Type</p>
                      <p className="font-bold text-lg capitalize">{booking.type}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {booking.type === 'flights' ? (
                    <div className="space-y-3">
                      <div>
                        <p className="text-2xl font-bold text-gray-800">
                          {booking.details.itineraries?.[0]?.segments?.[0]?.departure?.iataCode} 
                          <span className="text-indigo-600 mx-2">→</span>
                          {booking.details.itineraries?.[0]?.segments?.[0]?.arrival?.iataCode}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-indigo-600" />
                        <span>
                          {new Date(booking.details.itineraries?.[0]?.segments?.[0]?.departure?.at).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-indigo-600" />
                        <span>
                          {new Date(booking.details.itineraries?.[0]?.segments?.[0]?.departure?.at).toLocaleTimeString('en-US', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>

                      <div className="pt-3 border-t">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 text-sm">Total Price</span>
                          <span className="text-2xl font-bold text-indigo-600">
                            {booking.details.price?.total} {booking.details.price?.currency}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <p className="text-xl font-bold text-gray-800 line-clamp-2">
                          {booking.details.hotel?.name || 'Hotel'}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-purple-600" />
                        <span>{booking.details.hotel?.cityCode}</span>
                      </div>

                      {booking.details.offers?.[0] && (
                        <>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4 text-purple-600" />
                            <span>
                              {new Date(booking.details.offers[0].checkInDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              {' - '}
                              {new Date(booking.details.offers[0].checkOutDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          </div>

                          <div className="pt-3 border-t">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600 text-sm">Total Price</span>
                              <span className="text-2xl font-bold text-purple-600">
                                {booking.details.offers[0].price?.total} {booking.details.offers[0].price?.currency}
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Booking Date */}
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs text-gray-500">
                      Booked on {new Date(booking.createdAt).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}