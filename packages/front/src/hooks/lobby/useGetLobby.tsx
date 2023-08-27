import { useState, useEffect } from 'react'
import api from '../../services/api';
import { type Lobby } from '../types';

const useGetLobby = (code: string) => {
  const [lobby, setLobby] = useState<Lobby | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const fetchLobby = async () => {
      setIsLoading(true);

      try {
        const { data } = await api.get<Lobby>(`/lobby/${code}`);
  
        setLobby(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchLobby();
  }, [code]);

  return {
    lobby,
    error,
    isLoading,
  }
};

export default useGetLobby;
