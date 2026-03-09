// pages/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
            <LogIn size={22} className="text-primary" />
          </div>
          <h2 className="text-xl font-bold text-text-primary">Welcome Back</h2>
          <p className="text-sm text-text-muted mt-1">Sign in to your KrishnaKala Plants account</p>
        </div>

        <div className="bg-white rounded-xl border border-border p-6">
          {error && <div className="bg-red-50 text-red-600 border border-red-100 px-3 py-2 rounded-lg mb-4 text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-border rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Password</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border border-border rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-primary-light transition disabled:opacity-50 text-sm"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-text-muted mt-5">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-primary font-semibold hover:underline">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
