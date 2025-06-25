import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function useAuthToken() {
  const { currentUser } = useAuth();
  const [idToken, setIdToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getToken = async () => {
      if (currentUser) {
        try {
          const token = await currentUser.getIdToken();
          setIdToken(token);
        } catch (error) {
          console.error('Error getting ID token:', error);
          setIdToken(null);
        }
      } else {
        setIdToken(null);
      }
      setLoading(false);
    };

    getToken();
  }, [currentUser]);

  return { idToken, loading };
} 