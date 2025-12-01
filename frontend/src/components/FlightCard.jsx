import { Plane, Clock, Calendar, ArrowRight, Tag } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FlightCard({ flight, onBook, loading }) {
  const [showDetails, setShowDetails] = useState(false);
  const segment = flight.itineraries?.[0]?.segments?.[0];
  const departure = segment?.departure;
  const arrival = segment?.arrival;
  const navigate = useNavigate();

  const price = flight.price;

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const parseDuration = (duration) => {
    const match = duration?.match(/PT(\d+)H(\d+)M/);
    if (match) {
      return `${match[1]}h ${match[2]}m`;
    }
    return duration;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs opacity-90">Carrier</p>
              <p className="font-bold text-lg">{segment?.carrierCode}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-90">Flight</p>
            <p className="font-bold">{segment?.number}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Route */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <p className="text-3xl font-bold text-gray-800">
              {departure?.iataCode}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {formatTime(departure?.at)}
            </p>
            <p className="text-xs text-gray-400">{formatDate(departure?.at)}</p>
          </div>

          <div className="flex-1 flex flex-col items-center px-4">
            <div className="flex items-center gap-2 text-indigo-600 mb-1">
              <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
              <div className="flex-1 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
              <Plane className="w-4 h-4" />
              <div className="flex-1 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
              <div className="w-2 h-2 rounded-full bg-purple-600"></div>
            </div>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {parseDuration(flight.itineraries?.[0]?.duration)}
            </p>
          </div>

          <div className="flex-1 text-right">
            <p className="text-3xl font-bold text-gray-800">
              {arrival?.iataCode}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {formatTime(arrival?.at)}
            </p>
            <p className="text-xs text-gray-400">{formatDate(arrival?.at)}</p>
          </div>
        </div>

        {/* Details Toggle */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-indigo-600 text-sm font-medium mb-4 hover:underline"
        >
          {showDetails ? "Hide Details" : "Show Details"}
        </button>

        {showDetails && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Aircraft:</span>
              <span className="font-medium">{segment?.aircraft?.code}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cabin:</span>
              <span className="font-medium capitalize">
                {flight.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.cabin}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Available Seats:</span>
              <span className="font-medium">
                {segment?.numberOfStops === 0
                  ? "Non-stop"
                  : `${segment?.numberOfStops} stop(s)`}
              </span>
            </div>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl mb-4">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-indigo-600" />
            <div>
              <p className="text-xs text-gray-600">Total Price</p>
              <p className="text-3xl font-bold text-indigo-600">
                {price?.total}{" "}
                <span className="text-lg">{price?.currency}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Book Button */}
        <button
          onClick={() => navigate("/flight-details", { state: { flight } })}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl hover:shadow-xl hover:scale-105 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
        >
          View Details & Book
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
