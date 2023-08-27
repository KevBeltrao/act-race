import { useState, useEffect, Dispatch, SetStateAction, useCallback, useContext } from 'react';
import { Socket } from 'socket.io-client';

import createWebsocket from '../../services/websocket';

import { Lobby } from '../types';
import { OpponentsPositionContext } from '../../providers/OpponentsPositionProvider';

const useLobby = (
  lobby: Lobby | null,
  setIsInGame: Dispatch<SetStateAction<boolean>>
) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [error, setError] = useState('');
  const [players, setPlayers] = useState<Lobby['users']>(lobby?.users || []);
  const { opponentsPosition, setOpponentsPosition } = useContext(OpponentsPositionContext);
  useEffect(() => {
    setError('')
    if (!lobby) return setError('Lobby not found');

    if (lobby.users.length >= 5) {
      return setError('Lobby is full');
    }
    
    const newSocket = createWebsocket();

    newSocket.emit('join', {
      lobby,
      name: 'John Doe',
    });
  
    newSocket.on('join', (payload: {
      status: number;
      message: string;
      data: Lobby;
    }) => {
      setPlayers(payload.data.users);
    });

    newSocket.on('startGame', () => {
      setIsInGame(true);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      newSocket.off('join');
      setSocket(null);
    }
  }, [lobby, setIsInGame]);

  useEffect(() => {
    if (!socket) return;

    socket.on('updatePosition', (payload: { userId: string; position: number}) => {
      const opponentIndex = opponentsPosition.findIndex((opponent) => opponent.id === payload.userId);

      if (opponentIndex === -1) return;

      setOpponentsPosition(opponentsPosition.map((opponent, index) => {
        if (index === opponentIndex) {
          return {
            ...opponent,
            position: payload.position,
          }
        }
        return opponent;
      }))
    });

  }, [opponentsPosition, setOpponentsPosition, socket]);

  const startGame = useCallback(() => {
    if (!socket) return;
    if (!lobby) return;

    socket.emit('startGame', { lobby });
  }, [socket, lobby]);

  const updatePosition = useCallback((position: number) => {
    if (!socket) return;

    socket?.emit('updatePosition', {
      lobby,
      position,
    })
  }, [socket, lobby]);
  
  return {
    socket,
    error,
    players,
    startGame,
    updatePosition,
  };
}
 
export default useLobby;
