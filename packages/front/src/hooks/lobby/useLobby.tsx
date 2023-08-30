import { useState, useEffect, Dispatch, SetStateAction, useCallback, useContext } from 'react';
import { Socket } from 'socket.io-client';

import createWebsocket from '../../services/websocket';
import { OpponentsPositionContext } from '../../providers/OpponentsPositionProvider';
import { Emotion, EmotionContext } from '../../providers/EmotionProvider';

import { Lobby } from '../types';

const useLobby = (
  lobby: Lobby | null,
  setIsInGame: Dispatch<SetStateAction<boolean>>,
  name: string,
) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [error, setError] = useState('');
  const [players, setPlayers] = useState<Lobby['users']>(lobby?.users || []);
  const { opponentsPosition, setOpponentsPosition } = useContext(OpponentsPositionContext);
  const { setEmotion } = useContext(EmotionContext);

  useEffect(() => {
    setError('')
    if (!lobby) return setError('Lobby not found');

    if (lobby.users.length >= 5) {
      return setError('Lobby is full');
    }
    
    const newSocket = createWebsocket();

    newSocket.emit('join', {
      lobby,
      name,
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

    newSocket.on('updateEmotion', (payload: { emotion: Emotion }) => {
      setEmotion(payload.emotion);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      newSocket.off('join');
      setSocket(null);
    }
  }, [lobby, name, setEmotion, setIsInGame]);

  useEffect(() => {
    if (!socket) return;

    socket.on('updatePosition', (payload: { userId: string; position: number; videoSrc: string; }) => {
      const opponentIndex = opponentsPosition.findIndex((opponent) => opponent.id === payload.userId);

      if (opponentIndex === -1) return;

      setOpponentsPosition(opponentsPosition.map((opponent, index) => {
        if (index === opponentIndex) {
          return {
            ...opponent,
            position: payload.position,
            videoSrc: payload.videoSrc,
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

  const updatePosition = useCallback((position: number, videoSrc: string) => {
    if (!socket) return;

    socket?.emit('updatePosition', {
      lobby,
      position,
      videoSrc,
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
