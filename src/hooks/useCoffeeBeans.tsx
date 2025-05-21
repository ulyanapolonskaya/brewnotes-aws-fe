import { useState, useEffect } from 'react';
import { fetchBeans, deleteBean as apiDeleteBean, Bean } from '../services/api';

export const useCoffeeBeans = () => {
  const [beans, setBeans] = useState<Bean[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const refreshBeans = () => {
    setRefreshCounter(prev => prev + 1);
  };

  const deleteBean = async (id: string): Promise<boolean> => {
    try {
      setDeleteLoading(true);
      setDeleteError(null);
      await apiDeleteBean(id);
      refreshBeans();
      return true;
    } catch (err) {
      setDeleteError('Failed to delete bean');
      console.error(err);
      return false;
    } finally {
      setDeleteLoading(false);
    }
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

  return { beans, loading, error, deleteBean, deleteLoading, deleteError, refreshBeans };
};
