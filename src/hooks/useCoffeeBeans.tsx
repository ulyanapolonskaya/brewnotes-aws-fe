import { useState, useEffect } from 'react';
import { fetchBeans, Bean } from '../services/api';

export const useCoffeeBeans = () => {
  const [beans, setBeans] = useState<Bean[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshCounter, setRefreshCounter] = useState(0);

  const refreshBeans = () => {
    setRefreshCounter(prev => prev + 1);
  };

  useEffect(() => {
    const getBeans = async () => {
      try {
        setLoading(true);
        const data = await fetchBeans();
        setBeans(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch beans');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getBeans();
  }, [refreshCounter]);

  return { beans, loading, error, refreshBeans };
};
