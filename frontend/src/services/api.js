const API_URL = 'https://flights-and-hotels-mvc-72cw.vercel.app/';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const authAPI = {
  register: async (userData) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    console.log(res);
    
    return res.json();
  },

  login: async (credentials) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return res.json();
  }
};

export const flightsAPI = {
  search: async (searchParams) => {
    const res = await fetch(`${API_URL}/flights/search?${new URLSearchParams(searchParams)}`);
    return res.json();
  }
};

export const hotelsAPI = {
  search: async (searchParams) => {
    const res = await fetch(`${API_URL}/hotels/search?${new URLSearchParams(searchParams)}`);
    return res.json();
  }
};

export const bookingsAPI = {
  create: async (bookingData) => {
    const res = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(bookingData)
    });
    return res.json();
  },

  getAll: async () => {
    const res = await fetch(`${API_URL}/bookings`, {
      headers: getAuthHeader()
    });
    return res.json();
  }
};