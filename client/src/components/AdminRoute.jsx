import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function AdminRoute() {
  const { currentUser } = useSelector((state) => state.user);
  
  // Only allow access if user is logged in AND is an admin
  return currentUser && currentUser.role === 'admin' ? (
    <Outlet /> 
  ) : (
    <Navigate to='/sign-in' />
  );
}