'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, Lock, User } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "#FAF6F0" }}>
      <div className="rounded-3xl shadow-2xl w-full max-w-md overflow-hidden" style={{ background: "#FFFFFF", border: "1px solid #E7DED5" }}>
        {/* Header */}
        <div className="p-8 text-center text-white flex flex-col items-center justify-center" style={{ background: "#202B1A", borderBottom: "1px solid rgba(196,154,108,0.3)" }}>
          <img
            src="/logo-wordmark.png"
            alt="AWBIN"
            className="h-12 w-auto mb-2 rounded-lg object-contain"
          />
          <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: "#C49A6C" }}>Admin Management</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {error && (
            <div className="px-4 py-3 rounded-xl text-sm font-medium" style={{ background: "#FDF2F2", border: "1px solid #F87171", color: "#991B1B" }}>
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#3E2723" }}>
              Username or Email
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#80736B" }} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl outline-none text-sm"
                style={{ background: "#FAF6F0", border: "1.5px solid #E7DED5", color: "#2B211D" }}
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#3E2723" }}>
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#80736B" }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 rounded-xl outline-none text-sm"
                style={{ background: "#FAF6F0", border: "1.5px solid #E7DED5", color: "#2B211D" }}
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2"
                style={{ color: "#80736B" }}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-70"
            style={{ background: "#3E2723" }}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In to Dashboard'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="px-8 py-4 text-center" style={{ background: "#FAF6F0", borderTop: "1px solid #E7DED5" }}>
          <a href="/" className="text-xs font-bold hover:underline" style={{ color: "#C49A6C" }}>
            ← Back to AWBIN Store
          </a>
        </div>
      </div>
    </div>
  );
}

