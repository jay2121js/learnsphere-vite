import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import GoogleButton from '../components/GoogleButton';
import { useAuth } from '../components/AuthContext';


function Login() {
const { login, fetchSession } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
 const mainUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
  const redirectUri = mainUri + '/signup';

  const backendUri = import.meta.env.VITE_BACKEND_URI;

  if (code) {
    setLoading(true);
    setError('');

     fetch(`${backendUri}/auth/google/login/callback?code=${code}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: null,
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to authenticate with Google.');
        }
        return res.json();
      })
      .then((data) => {
        const userData = { name: data.name, email: data.email };
        login(userData);
        fetchSession(); // ✅ Refresh session info from backend
        navigate('/');
      })
      .catch((err) => {
        console.error('OAuth failed:', err);
        setError(err.message || 'Google authentication failed.');
      })
      .finally(() => setLoading(false));
  }
}, [navigate, login]);


  const handleLoginSubmit = async (e) => {
  e.preventDefault();
  const username = e.target[0].value;
  const password = e.target[1].value;

  if (password.length < 6) {
    setError('Password must be at least 6 characters long.');
    return;
  }

  try {
    const response = await fetch(`${backendUri}/Public/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', [...response.headers.entries()]);

    if (response.ok) {
      const data = await response.json();
      console.log('Response data:', data);
      const userData = { name: data.username, avatar: data.avatar };
      login(userData);
      setError('');
      navigate('/');
    } else {
      const errorText = await response.text();
      setErrorrese
    }
  } catch (err) {
    console.error('Login error:', err);
    setError(`Failed to connect to the server: ${err.message}.`);
  }
};
   const mainUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
  const redirectUri = mainUri + '/signup';
 const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const handleGoogleLogin = () => {
    const googleLoginUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile&access_type=offline&prompt=consent`;
    window.location.href = googleLoginUrl;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">Login</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Your username"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 dark:bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition"
          >
            Login
          </button>
        </form>
        <div className="my-4 text-center text-gray-500 dark:text-gray-400">or</div>
        <GoogleButton onClick={handleGoogleLogin} />
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          Don't have an account?{' '}
          <Link to="/signup" className="text-purple-500 dark:text-purple-400 hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
