import { Building2, MapPin, Calendar, Users, Tag, Bed, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function HotelCard({ hotel, onBook, loading }) {
  const [showDetails, setShowDetails] = useState(false);
  const hotelInfo = hotel.hotel;
  const offer = hotel.offers?.[0];

  const calculateNights = () => {
    if (!offer?.checkInDate || !offer?.checkOutDate) return 0;
    const checkIn = new Date(offer.checkInDate);
    const checkOut = new Date(offer.checkOutDate);
    const diffTime = Math.abs(checkOut - checkIn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const nights = calculateNights();

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-4">
        <div className="flex items-center gap-3 text-white">
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
            <Building2 className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg line-clamp-1">{hotelInfo?.name || 'Hotel'}</h3>
            <div className="flex items-center gap-2 mt-1">
              <MapPin className="w-4 h-4" />
              <p className="text-sm opacity-90">{hotelInfo?.cityCode}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Hotel Info */}
        <div className="mb-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-purple-600" />
            <span>Hotel ID: {hotelInfo?.hotelId}</span>
          </div>
        </div>

        {offer && (
          <>
            {/* Dates */}
            <div className="mb-4 p-4 bg-purple-50 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-gray-800">Stay Details</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Check-in</p>
                  <p className="font-semibold text-gray-800">
                    {new Date(offer.checkInDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Check-out</p>
                  <p className="font-semibold text-gray-800">
                    {new Date(offer.checkOutDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-purple-200">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-purple-600">{nights}</span> {nights === 1 ? 'night' : 'nights'}
                </p>
              </div>
            </div>

            {/* Room Details */}
            {offer.room?.typeEstimated && (
              <div className="mb-4">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-purple-600 text-sm font-medium mb-2 hover:underline"
                >
                  {showDetails ? 'Hide Room Details' : 'Show Room Details'}
                </button>
                
                {showDetails && (
                  <div className="p-4 bg-gray-50 rounded-lg space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Bed className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-600">Room Type:</span>
                      <span className="font-medium capitalize">{offer.room.typeEstimated.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bed className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-600">Beds:</span>
                      <span className="font-medium">{offer.room.typeEstimated.beds}</span>
                    </div>
                    {offer.room.typeEstimated.bedType && (
                      <div className="flex items-center gap-2">
                        <Bed className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-600">Bed Type:</span>
                        <span className="font-medium capitalize">{offer.room.typeEstimated.bedType}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-600">Guests:</span>
                      <span className="font-medium">{offer.guests?.adults || 1} {offer.guests?.adults === 1 ? 'Adult' : 'Adults'}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Price */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl mb-4">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-xs text-gray-600">Total Price</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {offer.price?.total} <span className="text-lg">{offer.price?.currency}</span>
                  </p>
                  {nights > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      ~{(parseFloat(offer.price?.total) / nights).toFixed(2)} {offer.price?.currency} per night
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Book Button */}
        <button
          onClick={() => onBook(hotel)}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl hover:shadow-xl hover:scale-105 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Booking...
            </>
          ) : (
            <>
              Book This Hotel
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}