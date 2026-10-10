'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Key, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // 1: email, 2: otp, 3: new password
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [resetToken, setResetToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const sendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setMessage(data.message);
        setStep(2);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp: formData.otp }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setResetToken(data.resetToken);
        setStep(3);
        setMessage('OTP verified! Enter new password.');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resetToken, newPassword: formData.newPassword }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        alert('Password reset successful! You can now login.');
        window.location.href = '/login';
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4" style={{ background: "#FAF6F0" }}>
      <div className="max-w-md w-full">
        <div className="rounded-3xl shadow-xl p-8" style={{ background: "#FFFFFF", border: "1px solid #E7DED5" }}>
          <div className="text-center mb-8">
            <Link href="/" className="text-3xl font-black tracking-tight inline-block mb-2" style={{ color: "#3E2723", fontFamily: "'Playfair Display', serif" }}>
              THAWBIN
            </Link>
            <h1 className="text-xl font-bold" style={{ color: "#2B211D" }}>Reset Password</h1>
            <p className="text-sm mt-1" style={{ color: "#80736B" }}>Follow steps to reset your password</p>
          </div>

          {message && (
            <div className="mb-6 p-4 rounded-xl text-sm flex items-center gap-2" style={{ background: "#F0FDF4", border: "1px solid #86EFAC", color: "#166534" }}>
              <CheckCircle className="w-5 h-5" />
              {message}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-xl text-sm" style={{ background: "#FDF2F2", border: "1px solid #F87171", color: "#991B1B" }}>
              {error}
            </div>
          )}

          {step === 1 && (
            <form onSubmit={sendOTP} className="space-y-4">
              <div>
                <label className="block text-xs font-bold tracking-wider uppercase mb-2 flex items-center gap-2" style={{ color: "#3E2723" }}>
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all text-sm"
                  style={{ background: "#FAF6F0", border: "1.5px solid #E7DED5", color: "#2B211D" }}
                  placeholder="your@email.com"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] disabled:opacity-50"
                style={{ background: "#3E2723" }}
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={verifyOTP} className="space-y-4">
              <div>
                <label className="block text-xs font-bold tracking-wider uppercase mb-2 flex items-center gap-2" style={{ color: "#3E2723" }}>
                  <Key className="w-4 h-4" />
                  Enter OTP (sent to {formData.email})
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={formData.otp}
                  onChange={(e) => setFormData({ ...formData, otp: e.target.value.replace(/\D/g, '') })}
                  className="w-full px-4 py-3 rounded-xl focus:outline-none text-center text-2xl font-mono tracking-widest"
                  style={{ background: "#FAF6F0", border: "1.5px solid #C49A6C", color: "#3E2723" }}
                  placeholder="123456"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 rounded-xl font-medium transition-all"
                  style={{ background: "#FAF6F0", border: "1px solid #E7DED5", color: "#3E2723" }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 text-white rounded-xl font-bold shadow-md transition-all disabled:opacity-50"
                  style={{ background: "#3E2723" }}
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={resetPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold tracking-wider uppercase mb-2" style={{ color: "#3E2723" }}>
                  New Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all text-sm pr-12"
                    style={{ background: "#FAF6F0", border: "1.5px solid #E7DED5", color: "#2B211D" }}
                    placeholder="New password (min 6 chars)"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold tracking-wider uppercase mb-2" style={{ color: "#3E2723" }}>
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all text-sm"
                  style={{ background: "#FAF6F0", border: "1.5px solid #E7DED5", color: "#2B211D" }}
                  placeholder="Confirm new password"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 rounded-xl font-medium transition-all"
                  style={{ background: "#FAF6F0", border: "1px solid #E7DED5", color: "#3E2723" }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 text-white rounded-xl font-bold shadow-md transition-all disabled:opacity-50"
                  style={{ background: "#C49A6C" }}
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </div>
            </form>
          )}

          <p className="mt-6 text-center text-sm" style={{ color: "#80736B" }}>
            <Link href="/login" className="font-bold hover:underline" style={{ color: "#C49A6C" }}>
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

