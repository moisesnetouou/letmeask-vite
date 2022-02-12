import { Navigate } from 'react-router';

export function RequireAuth({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('@fire:token');

  if (!token) {
    return <Navigate to="/" />;
  }
  return children;
}

export function NotRequireAuth({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('@fire:token');

  if (token) {
    return <Navigate to="/dashboard" />;
  }
  return children;
}
