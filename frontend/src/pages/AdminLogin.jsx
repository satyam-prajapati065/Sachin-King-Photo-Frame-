import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Sparkles, Shield, KeyRound, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(username, password);
    setLoading(false);

    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.message);
    }
  };

  const fillDemoCredentials = () => {
    setUsername('admin');
    setPassword('admin123');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-8 rounded-3xl glass-card border border-amber-500/40 shadow-2xl space-y-6 relative overflow-hidden gold-glow">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 w-fit mx-auto">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold font-playfair text-amber-100">
            Admin Portal Access
          </h1>
          <p className="text-xs text-amber-200/70">
            Sachin King Photo Frame Administration
          </p>
        </div>

        {/* Demo Fill Helper */}
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center space-y-1.5">
          <span className="text-[11px] text-amber-300 font-semibold block">
            💡 Quick Demo Credentials:
          </span>
          <p className="text-[10px] text-amber-200/80 font-mono">
            Username: <strong className="text-amber-300">admin</strong> | Password: <strong className="text-amber-300">admin123</strong>
          </p>
          <button
            type="button"
            onClick={fillDemoCredentials}
            className="text-xs text-amber-400 hover:text-amber-300 font-bold underline transition-colors"
          >
            Auto-fill Credentials
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-amber-300 font-medium mb-1">Username / Email</label>
            <div className="relative">
              <User className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-black/60 border border-amber-500/30 text-amber-100 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-amber-300 font-medium mb-1">Password</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-black/60 border border-amber-500/30 text-amber-100 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 font-bold uppercase tracking-wider text-xs hover:brightness-110 transition-all gold-glow"
          >
            <LogIn className="w-4 h-4" /> {loading ? 'Logging in...' : 'Sign In To Dashboard'}
          </button>
        </form>

      </div>
    </div>
  );
}
