// context/AuthContext.jsx
// Provides authentication state and methods across the app
import { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // On mount, decode token to get user info
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, [token]);

  // Register a new user
  const register = async (name, email, password) => {
    const res = await API.post('/auth/register', { name, email, password });
    return res.data;
  };

  // Login and store token
  const login = async (email, password) => {
    const res = await API.post('/auth/login', { email, password });
    setToken(res.data.token);
    setUser(res.data.user);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    return res.data;
  };

  // Logout and clear storage
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
