'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, UserPlus } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful! Please login.');
        window.location.href = '/login';
      } else {
        setError(data.error || 'Registration failed');
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
            <h1 className="text-xl font-bold mt-2" style={{ color: "#2B211D" }}>Create Account</h1>
            <p className="text-sm mt-1" style={{ color: "#80736B" }}>Join us and explore premium furniture</p>
          </div>

          {error && (
            <div className="mb-4 p-3 border rounded-xl text-sm font-medium" style={{ background: "#FDF2F2", borderColor: "#F87171", color: "#991B1B" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold tracking-wider uppercase mb-1" style={{ color: "#3E2723" }}>
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all text-sm"
                style={{ background: "#FAF6F0", border: "1.5px solid #E7DED5", color: "#2B211D" }}
                placeholder="Enter your name"
              />
            </div>

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
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all text-sm"
                style={{ background: "#FAF6F0", border: "1.5px solid #E7DED5", color: "#2B211D" }}
                placeholder="Enter your phone number"
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
                  placeholder="Create a password"
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

            <div>
              <label className="block text-xs font-bold tracking-wider uppercase mb-1" style={{ color: "#3E2723" }}>
                Confirm Password
              </label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all text-sm"
                style={{ background: "#FAF6F0", border: "1.5px solid #E7DED5", color: "#2B211D" }}
                placeholder="Confirm your password"
              />
            </div>

            <div className="flex items-start text-xs pt-1">
              <input type="checkbox" required className="mt-0.5 mr-2 accent-[#3E2723]" />
              <span style={{ color: "#80736B" }}>
                I agree to the{' '}
                <Link href="/terms" className="font-semibold hover:underline" style={{ color: "#C49A6C" }}>
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="font-semibold hover:underline" style={{ color: "#C49A6C" }}>
                  Privacy Policy
                </Link>
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] disabled:opacity-50"
              style={{ background: "#3E2723" }}
            >
              {loading ? (
                'Creating Account...'
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Register Now
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
            Already have an account?{' '}
            <Link href="/login" className="font-bold hover:underline" style={{ color: "#C49A6C" }}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
