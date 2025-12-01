import { useLocation, useNavigate } from 'react-router-dom';
import { Plane, Clock, Calendar, MapPin, ArrowRight, Users, Briefcase, Tag, Shield, Coffee, Wifi, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function FlightDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const flight = location.state?.flight;

  if (!flight) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Flight not found</p>
          <button
            onClick={() => navigate('/flights')}
            className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
          >
            Back to Flights
          </button>
        </div>
      </div>
    );
  }

  const segment = flight.itineraries?.[0]?.segments?.[0];
  const departure = segment?.departure;
  const arrival = segment?.arrival;
  const price = flight.price;
  const travelerPricing = flight.travelerPricings?.[0];
  const fareDetails = travelerPricing?.fareDetailsBySegment?.[0];

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const parseDuration = (duration) => {
    const match = duration?.match(/PT(\d+)H(\d+)M/);
    if (match) {
      return `${match[1]}h ${match[2]}m`;
    }
    return duration;
  };

  const getAirlineName = (code) => {
    const airlines = {
      'AA': 'American Airlines',
      'DL': 'Delta Air Lines',
      'UA': 'United Airlines',
      'BA': 'British Airways',
      'LH': 'Lufthansa',
      'AF': 'Air France',
      'EK': 'Emirates',
      'QR': 'Qatar Airways',
      'SQ': 'Singapore Airlines',
      'TK': 'Turkish Airlines'
    };
    return airlines[code] || code;
  };

  const getAirlineLogo = (code) => {
    const logos = {
      'AA': '✈️',
      'DL': '🔺',
      'UA': '🌐',
      'BA': '🇬🇧',
      'LH': '🦅',
      'AF': '🇫🇷',
      'EK': '🏜️',
      'QR': '🇶🇦',
      'SQ': '🇸🇬',
      'TK': '🇹🇷'
    };
    return logos[code] || '✈️';
  };

  const handleBookNow = () => {
    if (!isAuthenticated) {
      alert('Please login to book this flight');
      return;
    }

    navigate('/payment', {
      state: {
        bookingDetails: {
          type: 'flights',
          details: flight
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-6 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Search Results
          </button>
          
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
              <Plane className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Flight Details</h1>
              <p className="text-xl text-white/90">
                {departure?.iataCode} → {arrival?.iataCode}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Airline Info */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-4">
                <div className="text-6xl">{getAirlineLogo(segment?.carrierCode)}</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{getAirlineName(segment?.carrierCode)}</h3>
                  <p className="text-gray-600">Flight {segment?.carrierCode}{segment?.number}</p>
                </div>
              </div>
            </div>

            {/* Flight Route Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Flight Route</h2>
                  <p className="text-sm text-gray-500">{getAirlineName(segment?.carrierCode)}</p>
                </div>
              </div>

              <div className="space-y-8">
                {/* Departure */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-indigo-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Departure</p>
                        <p className="text-3xl font-bold text-gray-800">{departure?.iataCode}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-indigo-600">{formatTime(departure?.at)}</p>
                        <p className="text-sm text-gray-500">{formatDate(departure?.at)}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">Terminal {segment?.departure?.terminal || 'TBA'}</p>
                  </div>
                </div>

                {/* Flight Duration */}
                <div className="flex items-center gap-4 pl-8">
                  <div className="flex-1 relative">
                    <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                    <div className="relative flex justify-center">
                      <div className="bg-white px-4 py-2 rounded-full border-2 border-indigo-600 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm font-semibold text-indigo-600">
                          {parseDuration(flight.itineraries?.[0]?.duration)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrival */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Arrival</p>
                        <p className="text-3xl font-bold text-gray-800">{arrival?.iataCode}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-purple-600">{formatTime(arrival?.at)}</p>
                        <p className="text-sm text-gray-500">{formatDate(arrival?.at)}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">Terminal {segment?.arrival?.terminal || 'TBA'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Flight Details */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Flight Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <Plane className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Aircraft</p>
                    <p className="font-semibold text-gray-800">{segment?.aircraft?.code || 'TBA'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Briefcase className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Cabin Class</p>
                    <p className="font-semibold text-gray-800 capitalize">{fareDetails?.cabin || 'Economy'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <Users className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Available Seats</p>
                    <p className="font-semibold text-gray-800">{travelerPricing?.numberOfBookableSeats || 'Available'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Tag className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Booking Class</p>
                    <p className="font-semibold text-gray-800">{fareDetails?.class || 'Y'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Included Amenities</h2>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Coffee className="w-6 h-6 text-indigo-600" />
                  <span className="text-sm font-medium text-gray-700">Complimentary Snacks</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Wifi className="w-6 h-6 text-indigo-600" />
                  <span className="text-sm font-medium text-gray-700">In-Flight WiFi</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Shield className="w-6 h-6 text-indigo-600" />
                  <span className="text-sm font-medium text-gray-700">Travel Insurance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Price & Booking */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-8">
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">Total Price</p>
                <p className="text-4xl font-bold text-indigo-600">
                  {price?.total}
                  <span className="text-xl ml-2">{price?.currency}</span>
                </p>
                <p className="text-sm text-gray-500 mt-2">Per person, including taxes</p>
              </div>

              <div className="space-y-4 mb-6 pb-6 border-b">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Base Fare</span>
                  <span className="font-semibold">{travelerPricing?.price?.base} {price?.currency}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxes & Fees</span>
                  <span className="font-semibold">
                    {(parseFloat(price?.total) - parseFloat(travelerPricing?.price?.base || 0)).toFixed(2)} {price?.currency}
                  </span>
                </div>
              </div>

              <button
                onClick={handleBookNow}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl hover:shadow-xl hover:scale-105 transition-all font-bold text-lg flex items-center justify-center gap-2 mb-4"
              >
                Book This Flight
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="space-y-3">
                <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                  <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-green-800">Free Cancellation</p>
                    <p className="text-xs text-green-700">Cancel up to 24h before</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-800">Flexible Dates</p>
                    <p className="text-xs text-blue-700">Change dates for a fee</p>
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