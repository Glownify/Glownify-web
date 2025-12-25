import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, Lock, LogIn, Loader2 } from 'lucide-react';
import { login } from '../../redux/slice/authSlice';

const ROLE_ROUTES = {
  super_admin: '/super-admin/dashboard',
  admin: '/admin/dashboard',
  customer: '/',
  sales_executive: '/sales-executive/dashboard',
  salon_owner: '/saloon-owner/dashboard',
  salesman: '/salesman/dashboard',
};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, role, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token || !role) return;

    const redirectPath = ROLE_ROUTES[role] || '/';
    navigate(redirectPath, { replace: true });
  }, [token, role, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }

    try {
      const loginPromise = dispatch(login({ email, password })).unwrap();

      await toast.promise(loginPromise, {
        loading: 'Authenticating...',
        success: (res) => res?.message || 'Login successful',
        error: (err) => err || 'Invalid credentials',
      });
    } catch {
        console.error('Login failed');
    }
  };

  if (token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-2xl border border-gray-100 space-y-7"
      >
        {/* Header */}
        <div className="text-center">
          <LogIn className="w-10 h-10 text-indigo-600 mx-auto mb-2" />
          <h2 className="text-3xl font-extrabold text-gray-900">
            Sign In
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Access your control panel
          </p>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              <LogIn className="w-5 h-5" />
              Sign In
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
