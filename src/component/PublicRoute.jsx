import { Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/products" replace />;
  }

  return children;
};

export default PublicRoute;