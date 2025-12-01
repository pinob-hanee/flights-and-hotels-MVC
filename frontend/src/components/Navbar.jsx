import { Link } from 'react-router-dom';
import { Plane, LogIn, LogOut, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onAuthClick }) {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <Plane className="w-8 h-8 text-indigo-600" />
            <span className="text-2xl font-bold text-gray-800">TravelBook</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link 
              to="/flights" 
              className="text-gray-600 hover:text-indigo-600 font-medium"
            >
              Flights
            </Link>
            <Link 
              to="/hotels" 
              className="text-gray-600 hover:text-indigo-600 font-medium"
            >
              Hotels
            </Link>
            
            {isAuthenticated && (
              <Link 
                to="/bookings" 
                className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-medium"
              >
                <BookOpen className="w-4 h-4" />
                My Bookings
              </Link>
            )}

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-600">Hello, {user.name}</span>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <LogIn className="w-4 h-4" />
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}