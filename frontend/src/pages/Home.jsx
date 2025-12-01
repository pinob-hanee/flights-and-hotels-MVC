import { Link } from 'react-router-dom';
import { Plane, Building2, MapPin, Calendar } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Explore the World with TravelBook
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find the best flights and hotels at unbeatable prices
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Link to="/flights">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-indigo-100 p-4 rounded-full">
                  <Plane className="w-8 h-8 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Search Flights</h2>
              </div>
              <p className="text-gray-600">
                Find and book flights to destinations worldwide. Compare prices and get the best deals.
              </p>
            </div>
          </Link>

          <Link to="/hotels">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-indigo-100 p-4 rounded-full">
                  <Building2 className="w-8 h-8 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Book Hotels</h2>
              </div>
              <p className="text-gray-600">
                Discover amazing accommodations for your next trip. From budget to luxury hotels.
              </p>
            </div>
          </Link>
        </div>

        {/* Popular Destinations */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Destinations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { city: 'New York', code: 'NYC' },
              { city: 'London', code: 'LON' },
              { city: 'Paris', code: 'PAR' },
              { city: 'Dubai', code: 'DXB' },
              { city: 'Los Angeles', code: 'LAX' },
              { city: 'Tokyo', code: 'TYO' },
              { city: 'Barcelona', code: 'BCN' },
              { city: 'Rome', code: 'ROM' }
            ].map((dest) => (
              <div
                key={dest.code}
                className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-4 rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4" />
                  <p className="font-semibold">{dest.city}</p>
                </div>
                <p className="text-sm opacity-90">{dest.code}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Start Your Journey?
          </h2>
          <div className="flex justify-center gap-4">
            <Link
              to="/flights"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 font-semibold flex items-center gap-2"
            >
              <Plane className="w-5 h-5" />
              Search Flights
            </Link>
            <Link
              to="/hotels"
              className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 font-semibold flex items-center gap-2"
            >
              <Building2 className="w-5 h-5" />
              Search Hotels
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}