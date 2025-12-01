import { Building2, MapPin } from 'lucide-react';

export default function HotelCard({ hotel, onBook, loading }) {
  const hotelInfo = hotel.hotel;
  const offer = hotel.offers?.[0];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <Building2 className="w-6 h-6 text-indigo-600" />
        <h3 className="font-bold text-lg">{hotelInfo?.name || 'Hotel'}</h3>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <p className="text-sm">{hotelInfo?.cityCode}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Hotel ID: {hotelInfo?.hotelId}</p>
        </div>

        {offer && (
          <>
            <div className="pt-3 border-t">
              <p className="text-sm text-gray-600">Room Type: {offer.room?.typeEstimated?.category}</p>
              <p className="text-sm text-gray-600">Beds: {offer.room?.typeEstimated?.beds}</p>
            </div>

            <div className="pt-3 border-t">
              <p className="text-sm text-gray-600">Check-in: {offer.checkInDate}</p>
              <p className="text-sm text-gray-600">Check-out: {offer.checkOutDate}</p>
            </div>

            <div className="pt-3 border-t">
              <p className="text-2xl font-bold text-indigo-600">
                {offer.price?.total} {offer.price?.currency}
              </p>
            </div>
          </>
        )}
      </div>

      <button
        onClick={() => onBook(hotel)}
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 font-semibold"
      >
        {loading ? 'Booking...' : 'Book Now'}
      </button>
    </div>
  );
}