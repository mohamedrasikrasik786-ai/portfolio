import { useState, useEffect } from 'react';

const ADMIN_SESSION_KEY = 'rasik_admin_session';

export function useAdminAccess() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if admin session exists
    const session = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (session === 'authenticated') {
      setIsAdminAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = () => {
    sessionStorage.setItem(ADMIN_SESSION_KEY, 'authenticated');
    setIsAdminAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAdminAuthenticated(false);
    window.location.href = '/';
  };

  return {
    isAdminAuthenticated,
    isLoading,
    login,
    logout
  };
}
