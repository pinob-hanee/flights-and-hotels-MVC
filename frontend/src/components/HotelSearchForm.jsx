import { useState } from 'react';
import { Search } from 'lucide-react';

export default function HotelSearchForm({ onSearch, loading }) {
  const [searchData, setSearchData] = useState({
    cityCode: '',
    checkInDate: '',
    checkOutDate: '',
    adults: 1
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchData);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Search Hotels</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            City Code
          </label>
          <input
            type="text"
            placeholder="NYC"
            value={searchData.cityCode}
            onChange={(e) => setSearchData({ ...searchData, cityCode: e.target.value.toUpperCase() })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            maxLength="3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Check-in Date
          </label>
          <input
            type="date"
            value={searchData.checkInDate}
            onChange={(e) => setSearchData({ ...searchData, checkInDate: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Check-out Date
          </label>
          <input
            type="date"
            value={searchData.checkOutDate}
            onChange={(e) => setSearchData({ ...searchData, checkOutDate: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Adults
          </label>
          <input
            type="number"
            min="1"
            max="9"
            value={searchData.adults}
            onChange={(e) => setSearchData({ ...searchData, adults: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2 font-semibold"
      >
        <Search className="w-5 h-5" />
        {loading ? 'Searching...' : 'Search Hotels'}
      </button>
    </div>
  );
}   