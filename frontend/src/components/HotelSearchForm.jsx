import { useState } from 'react';
import { Search, MapPin, Calendar, Users, Building2 } from 'lucide-react';

export default function HotelSearchForm({ onSearch, loading }) {
  const [searchData, setSearchData] = useState({
    cityCode: '',
    checkInDate: '',
    checkOutDate: '',
    adults: 1
  });

  const handleSubmit = () => {
    if (!searchData.cityCode || !searchData.checkInDate || !searchData.checkOutDate) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (searchData.checkOutDate <= searchData.checkInDate) {
      alert('Check-out date must be after check-in date');
      return;
    }
    
    onSearch(searchData);
  };

  const popularCities = [
    { code: 'NYC', name: 'New York' },
    { code: 'LON', name: 'London' },
    { code: 'PAR', name: 'Paris' },
    { code: 'DXB', name: 'Dubai' },
  ];

  const quickFillCity = (city) => {
    setSearchData({
      ...searchData,
      cityCode: city.code
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-xl">
          <Building2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Search Hotels</h2>
          <p className="text-sm text-gray-500">Discover amazing places to stay</p>
        </div>
      </div>

      {/* Popular Cities Quick Fill */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <p className="text-sm font-medium text-gray-700 mb-3">Popular Cities:</p>
        <div className="flex flex-wrap gap-2">
          {popularCities.map((city, idx) => (
            <button
              key={idx}
              onClick={() => quickFillCity(city)}
              className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 text-purple-700 rounded-lg text-sm font-medium transition-all hover:shadow-md"
            >
              {city.name} ({city.code})
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* City Code */}
        <div className="md:col-span-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
            <MapPin className="w-4 h-4 text-purple-600" />
            City Code
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g., NYC, LON, PAR"
              value={searchData.cityCode}
              onChange={(e) => setSearchData({ ...searchData, cityCode: e.target.value.toUpperCase() })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg font-medium uppercase"
              maxLength="3"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              {searchData.cityCode.length}/3
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">Enter 3-letter city code</p>
        </div>

        {/* Check-in Date */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
            <Calendar className="w-4 h-4 text-purple-600" />
            Check-in Date
          </label>
          <input
            type="date"
            value={searchData.checkInDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setSearchData({ ...searchData, checkInDate: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Check-out Date */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
            <Calendar className="w-4 h-4 text-pink-600" />
            Check-out Date
          </label>
          <input
            type="date"
            value={searchData.checkOutDate}
            min={searchData.checkInDate || new Date().toISOString().split('T')[0]}
            onChange={(e) => setSearchData({ ...searchData, checkOutDate: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Adults */}
        <div className="md:col-span-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
            <Users className="w-4 h-4 text-purple-600" />
            Number of Guests
          </label>
          <select
            value={searchData.adults}
            onChange={(e) => setSearchData({ ...searchData, adults: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'Guest' : 'Guests'}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl hover:shadow-2xl hover:scale-105 transition-all font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
      >
        {loading ? (
          <>
            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
            Searching Hotels...
          </>
        ) : (
          <>
            <Search className="w-6 h-6" />
            Search Hotels
          </>
        )}
      </button>

      {/* Tips */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
        <p className="text-sm text-gray-700 font-medium mb-2">💡 Booking Tips:</p>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Use 3-letter city codes (e.g., NYC for New York)</li>
          <li>• Book early for special events and holidays</li>
          <li>• Check cancellation policies before booking</li>
        </ul>
      </div>
    </div>
  );
}