import { Plane, Clock } from 'lucide-react';

export default function FlightCard({ flight, onBook, loading }) {
  const segment = flight.itineraries?.[0]?.segments?.[0];
  const departure = segment?.departure;
  const arrival = segment?.arrival;
  const price = flight.price;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <Plane className="w-6 h-6 text-indigo-600" />
        <h3 className="font-bold text-lg">
          {departure?.iataCode} → {arrival?.iataCode}
        </h3>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Departure</p>
            <p className="font-semibold">{departure?.iataCode}</p>
            <p className="text-sm text-gray-600">
              {new Date(departure?.at).toLocaleString()}
            </p>
          </div>
          <Clock className="w-5 h-5 text-gray-400" />
          <div className="text-right">
            <p className="text-sm text-gray-500">Arrival</p>
            <p className="font-semibold">{arrival?.iataCode}</p>
            <p className="text-sm text-gray-600">
              {new Date(arrival?.at).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="pt-3 border-t">
          <p className="text-sm text-gray-600">Duration: {flight.itineraries?.[0]?.duration}</p>
          <p className="text-sm text-gray-600">Carrier: {segment?.carrierCode}</p>
        </div>

        <div className="pt-3 border-t">
          <p className="text-2xl font-bold text-indigo-600">
            {price?.total} {price?.currency}
          </p>
        </div>
      </div>

      <button
        onClick={() => onBook(flight)}
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 font-semibold"
      >
        {loading ? 'Booking...' : 'Book Now'}
      </button>
    </div>
  );
}