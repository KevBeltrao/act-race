import { useCallback, useState } from 'react'
import api from '../../services/api';
import { Lobby } from '../types';

const useCreateLobby = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const createLobby = useCallback(async (joinLobby: (code: string) => void) => {
    setIsLoading(true);
    setError('');
    try {
      const { data } = await api.post<Lobby>('/lobby');

      joinLobby(data.code);

      return data;
    } catch (error: unknown) {

      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createLobby,
    error,
    isLoading,
  }
};

export default useCreateLobby;
