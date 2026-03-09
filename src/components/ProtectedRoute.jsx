// components/ProtectedRoute.jsx
// Wrapper that redirects unauthenticated/unauthorized users
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  // Show nothing while checking auth state
  if (loading) return <div className="text-center py-20">Loading...</div>;

  // Redirect to login if not authenticated
  if (!user) return <Navigate to="/login" replace />;

  // Redirect to home if not admin but route requires admin
  if (adminOnly && user.role !== 'admin') return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
