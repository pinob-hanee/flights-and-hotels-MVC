/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Building2, Calendar, DollarSign } from 'lucide-react';
import { bookingsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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
        setError('Connection error');
      }
      setLoading(false);
    };

    fetchBookings();
  }, [isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading bookings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">My Bookings</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-800 rounded-lg">
            {error}
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <p className="text-xl text-gray-600 mb-4">You don't have any bookings yet</p>
            <p className="text-gray-500">Start exploring and book your next adventure!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  {booking.type === 'flights' ? (
                    <Plane className="w-6 h-6 text-indigo-600" />
                  ) : (
                    <Building2 className="w-6 h-6 text-indigo-600" />
                  )}
                  <h3 className="font-bold text-lg capitalize">{booking.type}</h3>
                </div>

                {booking.type === 'flights' ? (
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold">
                      {booking.details.itineraries?.[0]?.segments?.[0]?.departure?.iataCode} → {booking.details.itineraries?.[0]?.segments?.[0]?.arrival?.iataCode}
                    </p>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <p>{new Date(booking.details.itineraries?.[0]?.segments?.[0]?.departure?.at).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <DollarSign className="w-4 h-4" />
                      <p className="font-semibold text-indigo-600">
                        {booking.details.price?.total} {booking.details.price?.currency}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold">{booking.details.hotel?.name || 'Hotel'}</p>
                    <p className="text-gray-600">City: {booking.details.hotel?.cityCode}</p>
                    {booking.details.offers?.[0] && (
                      <>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <p>{booking.details.offers[0].checkInDate} - {booking.details.offers[0].checkOutDate}</p>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <DollarSign className="w-4 h-4" />
                          <p className="font-semibold text-indigo-600">
                            {booking.details.offers[0].price?.total} {booking.details.offers[0].price?.currency}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                )}

                <div className="mt-4 pt-4 border-t text-xs text-gray-500">
                  Booked on: {new Date(booking.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}