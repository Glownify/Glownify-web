import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, Lock, LogIn, Loader2 } from 'lucide-react';
import { login } from '../../redux/slice/authSlice';
import { clearError } from '../../redux/slice/authSlice';
import { ROLE_ROUTES } from '../../utils/role_Routes.js';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, role, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token || !role) return;
    const redirectPath = ROLE_ROUTES[role] || '/';
    console.log('Redirecting to:', redirectPath, 'for role:', role);
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
      error: (err) => err?.message || 'Invalid email or password',
    });
  } catch (error) {
    // No need to toast here (already handled by toast.promise)
    console.error('Login failed:', error);
  }
};

useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);


  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className=" pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto mt-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <LogIn className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Please enter your details to sign in
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white py-8 px-6 shadow-md rounded-2xl border border-gray-100">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <a href="/forgot-password" size="sm" className="text-xs text-indigo-600 hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <a href="/register" className="text-indigo-600 font-bold hover:underline">
                Create one
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;