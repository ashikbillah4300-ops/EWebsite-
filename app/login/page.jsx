'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, LogIn } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user);
        
        if (data.user?.role === 'admin' || data.user?.role === 'moderator') {
          router.push('/admin');
        } else {
          router.push('/');
        }
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4" style={{ background: "#FAF6F0" }}>
      <div className="max-w-md w-full">
        <div className="rounded-3xl shadow-xl p-8" style={{ background: "#FFFFFF", border: "1px solid #E7DED5" }}>
          <div className="text-center mb-8">
            <Link href="/" className="text-3xl font-black tracking-tight inline-block" style={{ color: "#3E2723", fontFamily: "'Playfair Display', serif" }}>
              THAWBIN
            </Link>
            <h1 className="text-xl font-bold mt-2" style={{ color: "#2B211D" }}>Welcome Back!</h1>
            <p className="text-sm mt-1" style={{ color: "#80736B" }}>Sign in to your account</p>
          </div>

          {error && (
            <div className="mb-4 p-3 border rounded-xl text-sm font-medium" style={{ background: "#FDF2F2", borderColor: "#F87171", color: "#991B1B" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold tracking-wider uppercase mb-1" style={{ color: "#3E2723" }}>
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all text-sm"
                style={{ background: "#FAF6F0", border: "1.5px solid #E7DED5", color: "#2B211D" }}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider uppercase mb-1" style={{ color: "#3E2723" }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all text-sm pr-12"
                  style={{ background: "#FAF6F0", border: "1.5px solid #E7DED5", color: "#2B211D" }}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "#80736B" }}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer" style={{ color: "#80736B" }}>
                <input type="checkbox" className="accent-[#3E2723] rounded" />
                <span>Remember me</span>
              </label>
              <Link href="/forgot-password" className="font-semibold hover:underline" style={{ color: "#C49A6C" }}>
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] disabled:opacity-50"
              style={{ background: "#3E2723" }}
            >
              {loading ? (
                'Signing in...'
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: "#E7DED5" }}></div>
            <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: "#80736B" }}>OR</span>
            <div className="flex-1 h-px" style={{ background: "#E7DED5" }}></div>
          </div>

          <p className="mt-6 text-center text-sm" style={{ color: "#80736B" }}>
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-bold hover:underline" style={{ color: "#C49A6C" }}>
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
