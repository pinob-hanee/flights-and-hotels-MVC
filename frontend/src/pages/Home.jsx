import { Link } from 'react-router-dom';
import { Plane, Building2, MapPin, Calendar, Shield, CreditCard, Award, ArrowRight } from 'lucide-react';

export default function Home() {
  const popularDestinations = [
    { city: 'New York', code: 'NYC', country: 'USA', image: '🗽' },
    { city: 'London', code: 'LON', country: 'UK', image: '🏰' },
    { city: 'Paris', code: 'PAR', country: 'France', image: '🗼' },
    { city: 'Dubai', code: 'DXB', country: 'UAE', image: '🕌' },
    { city: 'Los Angeles', code: 'LAX', country: 'USA', image: '🌴' },
    { city: 'Tokyo', code: 'TYO', country: 'Japan', image: '🗾' },
    { city: 'Barcelona', code: 'BCN', country: 'Spain', image: '⚽' },
    { city: 'Rome', code: 'ROM', country: 'Italy', image: '🏛️' }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Secure Booking',
      description: 'Your data is protected with industry-standard encryption'
    },
    {
      icon: CreditCard,
      title: 'Best Prices',
      description: 'Compare prices from multiple providers in real-time'
    },
    {
      icon: Award,
      title: 'Quality Service',
      description: '24/7 customer support for all your travel needs'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
              Your Journey Begins Here
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
              Discover amazing destinations, book flights and hotels at the best prices
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/flights"
                className="group bg-white text-indigo-600 px-8 py-4 rounded-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 font-semibold text-lg flex items-center justify-center gap-2"
              >
                <Plane className="w-6 h-6" />
                Search Flights
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/hotels"
                className="group bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white/20 transform hover:-translate-y-1 transition-all duration-300 font-semibold text-lg flex items-center justify-center gap-2"
              >
                <Building2 className="w-6 h-6" />
                Search Hotels
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" className="w-full h-12 sm:h-16">
            <path d="M0,64 C480,150 720,0 1200,64 L1200,120 L0,120 Z" fill="rgb(239, 246, 255)"></path>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Search Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <Link to="/flights" className="group">
            <div className="relative bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-xl inline-block mb-4 shadow-lg">
                  <Plane className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-3">Search Flights</h2>
                <p className="text-gray-600 mb-4">
                  Find and book flights to destinations worldwide. Compare prices from multiple airlines and get the best deals for your journey.
                </p>
                <div className="flex items-center text-indigo-600 font-semibold group-hover:gap-3 gap-2 transition-all">
                  Start Searching
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </Link>

          <Link to="/hotels" className="group">
            <div className="relative bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-4 rounded-xl inline-block mb-4 shadow-lg">
                  <Building2 className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-3">Book Hotels</h2>
                <p className="text-gray-600 mb-4">
                  Discover amazing accommodations for your next trip. From budget-friendly to luxury hotels, find the perfect place to stay.
                </p>
                <div className="flex items-center text-purple-600 font-semibold group-hover:gap-3 gap-2 transition-all">
                  Start Searching
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Features */}
        <div className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose TravelBook?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-4 rounded-xl inline-block mb-4">
                  <feature.icon className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Destinations */}
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Popular Destinations
            </h2>
            <p className="text-gray-600 text-lg">
              Explore the world's most amazing cities
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {popularDestinations.map((dest) => (
              <div
                key={dest.code}
                className="group relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <div className="relative text-white">
                  <div className="text-5xl mb-3">{dest.image}</div>
                  <h3 className="font-bold text-xl mb-1">{dest.city}</h3>
                  <p className="text-sm text-white/90">{dest.country}</p>
                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{dest.code}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl p-12 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who trust TravelBook for their adventures
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/flights"
              className="bg-white text-indigo-600 px-8 py-4 rounded-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all font-semibold text-lg flex items-center justify-center gap-2"
            >
              <Plane className="w-5 h-5" />
              Book a Flight
            </Link>
            <Link
              to="/hotels"
              className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white/20 transform hover:-translate-y-1 transition-all font-semibold text-lg flex items-center justify-center gap-2"
            >
              <Building2 className="w-5 h-5" />
              Find a Hotel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}