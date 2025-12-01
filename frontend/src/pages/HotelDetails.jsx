import { useLocation, useNavigate } from "react-router-dom";
import {
  Building2,
  MapPin,
  Calendar,
  Users,
  Bed,
  Star,
  Wifi,
  Coffee,
  Car,
  Utensils,
  Shield,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function HotelDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const hotel = location.state?.hotel;

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Hotel not found</p>
          <button
            onClick={() => navigate("/hotels")}
            className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
          >
            Back to Hotels
          </button>
        </div>
      </div>
    );
  }

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

  const getHotelLogo = (cityCode) => {
    const logos = {
      NYC: "🗽",
      LON: "🏰",
      PAR: "🗼",
      DXB: "🕌",
      LAX: "🌴",
      TYO: "🗾",
      BCN: "⚽",
      ROM: "🏛️",
    };
    return logos[cityCode] || "🏨";
  };

  const handleBookNow = () => {
    if (!isAuthenticated) {
      alert("Please login to book this hotel");
      return;
    }

    navigate("/payment", {
      state: {
        bookingDetails: {
          type: "hotels",
          details: hotel,
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white py-12">
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
              <Building2 className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Hotel Details</h1>
              <p className="text-xl text-white/90">
                {hotelInfo?.name || "Premium Hotel"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hotel Overview */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-start gap-6">
                <div className="text-7xl">
                  {getHotelLogo(hotelInfo?.cityCode)}
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {hotelInfo?.name || "Luxury Hotel"}
                  </h2>
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-600">{hotelInfo?.cityCode}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      (4.8/5 from 1,234 reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stay Details */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-xl">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Your Stay
                  </h2>
                  <p className="text-sm text-gray-500">
                    {nights} {nights === 1 ? "night" : "nights"}
                  </p>
                </div>
              </div>

              {offer && (
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Check-in</p>
                    <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                      <Calendar className="w-6 h-6 text-purple-600" />
                      <div>
                        <p className="font-semibold text-gray-800">
                          {new Date(offer.checkInDate).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </p>
                        <p className="text-sm text-gray-600">After 3:00 PM</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-2">Check-out</p>
                    <div className="flex items-center gap-3 p-4 bg-pink-50 rounded-xl">
                      <Calendar className="w-6 h-6 text-pink-600" />
                      <div>
                        <p className="font-semibold text-gray-800">
                          {new Date(offer.checkOutDate).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </p>
                        <p className="text-sm text-gray-600">Before 11:00 AM</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Room Details */}
            {offer?.room?.typeEstimated && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Room Details
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Bed className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Room Type</p>
                      <p className="font-semibold text-gray-800 capitalize">
                        {offer.room.typeEstimated.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-pink-100 p-3 rounded-lg">
                      <Bed className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Number of Beds
                      </p>
                      <p className="font-semibold text-gray-800">
                        {offer.room.typeEstimated.beds || 1}
                      </p>
                    </div>
                  </div>

                  {offer.room.typeEstimated.bedType && (
                    <div className="flex items-start gap-4">
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <Bed className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Bed Type</p>
                        <p className="font-semibold text-gray-800 capitalize">
                          {offer.room.typeEstimated.bedType}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    <div className="bg-pink-100 p-3 rounded-lg">
                      <Users className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Guests</p>
                      <p className="font-semibold text-gray-800">
                        {offer.guests?.adults || 1}{" "}
                        {offer.guests?.adults === 1 ? "Adult" : "Adults"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Amenities */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Hotel Amenities
              </h2>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Wifi className="w-6 h-6 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Free WiFi
                  </span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Coffee className="w-6 h-6 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Breakfast Included
                  </span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Car className="w-6 h-6 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Free Parking
                  </span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Utensils className="w-6 h-6 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Restaurant
                  </span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Shield className="w-6 h-6 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">
                    24/7 Security
                  </span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Star className="w-6 h-6 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Spa & Wellness
                  </span>
                </div>
              </div>
            </div>

            {/* Hotel Policies */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Hotel Policies
              </h2>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="text-purple-600 text-xl">✓</div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Check-in from 3:00 PM
                    </p>
                    <p className="text-sm text-gray-600">
                      Early check-in subject to availability
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="text-purple-600 text-xl">✓</div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Check-out until 11:00 AM
                    </p>
                    <p className="text-sm text-gray-600">
                      Late check-out available for a fee
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="text-purple-600 text-xl">✓</div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Free cancellation
                    </p>
                    <p className="text-sm text-gray-600">
                      Cancel up to 48 hours before check-in
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Sidebar - Price & Booking */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-8">
              {offer && (
                <>
                  <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-2">Total Price</p>
                    <p className="text-4xl font-bold text-purple-600">
                      {offer.price?.total}
                      <span className="text-xl ml-2">
                        {offer.price?.currency}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      For {nights} {nights === 1 ? "night" : "nights"}
                    </p>
                  </div>

                  <div className="space-y-4 mb-6 pb-6 border-b">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Per Night</span>
                      <span className="font-semibold">
                        {(parseFloat(offer.price?.total) / nights).toFixed(2)}{" "}
                        {offer.price?.currency}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Taxes & Fees</span>
                      <span className="font-semibold">Included</span>
                    </div>
                  </div>
                </>
              )}

              <button
                onClick={handleBookNow}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl hover:shadow-xl hover:scale-105 transition-all font-bold text-lg flex items-center justify-center gap-2 mb-4"
              >
                Book This Hotel
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="space-y-3">
                <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                  <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-green-800">
                      Free Cancellation
                    </p>
                    <p className="text-xs text-green-700">
                      Cancel up to 48h before
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                  <Star className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-800">
                      Best Price Guarantee
                    </p>
                    <p className="text-xs text-blue-700">
                      We match lower prices
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
