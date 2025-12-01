const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Amadeus = require('amadeus');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://binobhanyvip01:VnIIUrsKgH1pG939@cluster0.jijyx.mongodb.net/amadeus');

// Amadeus API Setup
const amadeus = new Amadeus({
  clientId: 'wgbm86aZ3sginJ2fQoZxYdVMUy53N3G0',
  clientSecret: 'eGv9f0JPi3wkYu9G'
});

// MongoDB Schemas
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['flights', 'hotels'], required: true },
  details: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Booking = mongoose.model('Booking', bookingSchema);

// JWT Secret
const JWT_SECRET = 'your-secret-key-change-this-in-production';

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    // Generate token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Search Flights
app.get('/api/flights/search', async (req, res) => {
  try {
    const { origin, destination, departureDate, adults } = req.query;

    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: departureDate,
      adults: adults || '1'
    });

    res.json(response.result);
  } catch (error) {
    console.error('Flight search error:', error);
    res.status(500).json({ error: 'Flight search failed', details: error.description });
  }
});

// Search Hotels
app.get('/api/hotels/search', async (req, res) => {
  try {
    const { cityCode, checkInDate, checkOutDate, adults } = req.query;

    // First get hotel list by city
    const hotelListResponse = await amadeus.referenceData.locations.hotels.byCity.get({
      cityCode: cityCode
    });

    const hotelIds = hotelListResponse.data.slice(0, 10).map(hotel => hotel.hotelId);

    if (hotelIds.length === 0) {
      return res.json({ data: [] });
    }

    // Then get hotel offers
    const response = await amadeus.shopping.hotelOffersSearch.get({
      hotelIds: hotelIds.join(','),
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      adults: adults || '1'
    });

    res.json(response.result);
  } catch (error) {
    console.error('Hotel search error:', error);
    res.status(500).json({ error: 'Hotel search failed', details: error.description });
  }
});

// Create Booking
app.post('/api/bookings', authenticateToken, async (req, res) => {
  try {
    const { type, details } = req.body;

    const booking = new Booking({
      userId: req.user.id,
      type,
      details
    });

    await booking.save();

    res.json({ message: 'Booking created successfully', booking });
  } catch (error) {
    res.status(500).json({ error: 'Booking failed' });
  }
});

// Get User Bookings
app.get('/api/bookings', authenticateToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});