import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import Home from './pages/Home';
import Flights from './pages/Flights';
import Hotels from './pages/Hotels';
import Bookings from './pages/Bookings';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen">
          <Navbar onAuthClick={() => setShowAuthModal(true)} />
          <AuthModal 
            isOpen={showAuthModal} 
            onClose={() => setShowAuthModal(false)} 
          />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/flights" 
              element={<Flights onAuthRequired={() => setShowAuthModal(true)} />} 
            />
            <Route 
              path="/hotels" 
              element={<Hotels onAuthRequired={() => setShowAuthModal(true)} />} 
            />
            <Route path="/bookings" element={<Bookings />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;