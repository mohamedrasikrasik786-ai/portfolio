import { useState, useEffect } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/config/firebase';

// ==========================================
// CUSTOM HOOKS
// ==========================================

/**
 * Hook to get current authenticated user
 */
export function useAuth() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user
  };
}

/**
 * Hook to check if user has a specific role (requires custom claims)
 */
export function useUserRole() {
  const { user } = useAuth();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      user.getIdTokenResult().then((idTokenResult) => {
        setRole(idTokenResult.claims.role as string || 'user');
        setLoading(false);
      });
    } else {
      setRole(null);
      setLoading(false);
    }
  }, [user]);

  return {
    role,
    loading,
    isAdmin: role === 'admin',
    isModerator: role === 'moderator',
    isUser: role === 'user'
  };
}
