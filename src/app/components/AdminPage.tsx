import { useState, useEffect } from 'react';
import { AdminPanel } from './admin/AdminPanel';
import { AdminLogin } from './admin/AdminLogin';
import { useNavigate } from 'react-router-dom';

export function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check for existing session
  useEffect(() => {
    const session = sessionStorage.getItem('admin_session');
    if (session === 'active') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    sessionStorage.setItem('admin_session', 'active');
    setIsLoggedIn(true);
  };

  const handleClose = () => {
    // If we want to logout on close:
    // sessionStorage.removeItem('admin_session');
    // setIsLoggedIn(false);
    
    // Or just navigate away
    navigate('/');
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminPanel onClose={handleClose} />;
}
