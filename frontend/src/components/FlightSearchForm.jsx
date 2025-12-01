import { useState } from 'react';
import { Search, MapPin, Calendar, Users, Plane } from 'lucide-react';

export default function FlightSearchForm({ onSearch, loading }) {
  const [searchData, setSearchData] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    adults: 1
  });

  const handleSubmit = () => {
    if (!searchData.origin || !searchData.destination || !searchData.departureDate) {
      alert('Please fill in all required fields');
      return;
    }
    onSearch(searchData);
  };

  const popularRoutes = [
    { from: 'JFK', to: 'LAX', label: 'New York → Los Angeles' },
    { from: 'LHR', to: 'JFK', label: 'London → New York' },
    { from: 'CDG', to: 'DXB', label: 'Paris → Dubai' },
  ];

  const quickFillRoute = (route) => {
    setSearchData({
      ...searchData,
      origin: route.from,
      destination: route.to
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl">
          <Plane className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Search Flights</h2>
          <p className="text-sm text-gray-500">Find the best flights for your journey</p>
        </div>
      </div>

      {/* Popular Routes Quick Fill */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <p className="text-sm font-medium text-gray-700 mb-3">Popular Routes:</p>
        <div className="flex flex-wrap gap-2">
          {popularRoutes.map((route, idx) => (
            <button
              key={idx}
              onClick={() => quickFillRoute(route)}
              className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-700 rounded-lg text-sm font-medium transition-all hover:shadow-md"
            >
              {route.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Origin */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
            <MapPin className="w-4 h-4 text-indigo-600" />
            From (Airport Code)
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g., JFK, LAX, LHR"
              value={searchData.origin}
              onChange={(e) => setSearchData({ ...searchData, origin: e.target.value.toUpperCase() })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-lg font-medium uppercase"
              maxLength="3"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              {searchData.origin.length}/3
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">Enter 3-letter airport code</p>
        </div>

        {/* Destination */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
            <MapPin className="w-4 h-4 text-purple-600" />
            To (Airport Code)
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g., LAX, CDG, DXB"
              value={searchData.destination}
              onChange={(e) => setSearchData({ ...searchData, destination: e.target.value.toUpperCase() })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg font-medium uppercase"
              maxLength="3"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              {searchData.destination.length}/3
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">Enter 3-letter airport code</p>
        </div>

        {/* Departure Date */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
            <Calendar className="w-4 h-4 text-indigo-600" />
            Departure Date
          </label>
          <input
            type="date"
            value={searchData.departureDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setSearchData({ ...searchData, departureDate: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Adults */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
            <Users className="w-4 h-4 text-purple-600" />
            Passengers
          </label>
          <select
            value={searchData.adults}
            onChange={(e) => setSearchData({ ...searchData, adults: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'Adult' : 'Adults'}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl hover:shadow-2xl hover:scale-105 transition-all font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
      >
        {loading ? (
          <>
            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
            Searching Flights...
          </>
        ) : (
          <>
            <Search className="w-6 h-6" />
            Search Flights
          </>
        )}
      </button>

      {/* Tips */}
      <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
        <p className="text-sm text-gray-700 font-medium mb-2">💡 Search Tips:</p>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Use 3-letter IATA airport codes (e.g., JFK for New York)</li>
          <li>• Book in advance for better prices</li>
          <li>• Be flexible with dates for more options</li>
        </ul>
      </div>
    </div>
  );
}