import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [user, setUser] = useState(() => {
    const cachedUser = localStorage.getItem('user');
    return cachedUser ? JSON.parse(cachedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
  const backendUri = import.meta.env.VITE_BACKEND_URI;


  const fetchSession = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${backendUri}/Public/session`, {
        method: 'GET',
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        const userData = {
          name: data.name,
          email: data.email,
          role: data.role,
          avatar: data.avatar || 'https://via.placeholder.com/150', // Fallback only if backend returns null
        };
        setIsLoggedIn(true);
        setUser(userData);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(userData));
        setIsLoading(false);
        return true;
      } else {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        setIsLoading(false);
        return false;
      }
    } catch (err) {
      console.error('Session check failed:', err);
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
      setIsLoading(false);
      return false;
    }
  }, []);

  // Check session on initial mount
  useEffect(() => {
    let isMounted = true;
    const checkSession = async () => {
      if (isMounted) {
        await fetchSession();
      }
    };
    checkSession();
    return () => {
      isMounted = false;
    };
  }, [fetchSession]);

  const login = async (userData) => {
    setIsLoading(true);
    // Instead of setting user immediately, fetch session to get accurate backend data
    const sessionSuccess = await fetchSession();
    if (sessionSuccess) {
      // If session fetch is successful, user data is already set by fetchSession
      navigate('/');
    } else {
      // If session fetch fails, use provided userData with fallback avatar
      const fallbackUserData = {
        name: userData.name,
        email: userData.email,
        role: userData.role,
        avatar: userData.avatar || 'https://via.placeholder.com/150',
      };
      setIsLoggedIn(true);
      setUser(fallbackUserData);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(fallbackUserData));
      navigate('/login');
    }
    setIsLoading(false);
    return sessionSuccess;
  };

  const logout = async () => {
    try {
      await fetch(`${backendUri}/Public/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('Logout error:', err);
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
      navigate('/login', { replace: true });
    }
  };

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
  });

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, getAuthHeaders, fetchSession, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);