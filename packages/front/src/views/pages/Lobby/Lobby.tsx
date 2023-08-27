import { useState, type FC, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import useGetLobby from '../../../hooks/lobby/useGetLobby';
import useLobby from '../../../hooks/lobby/useLobby';
import { OpponentsPositionContext } from '../../../providers/OpponentsPositionProvider';

import Game from '../Game/Game';
import { CarPositionContext } from '../../../providers/CarPositionProvider';

const Lobby: FC = () => {
  const { code } = useParams<{ code: string }>();
  const [isInGame, setIsInGame] = useState(false);
  const { lobby, error: getLobbyError, isLoading } = useGetLobby(code!);
  const { error: lobbyError, players, socket, startGame, updatePosition } = useLobby(lobby, setIsInGame);
  const { setOpponentsPosition } = useContext(OpponentsPositionContext);
  const { setCarPosition } = useContext(CarPositionContext);

  useEffect(() => {
    if (!socket) return;

    if (isInGame) {
      const playersZeroed = players
        .filter((player) => player.id !== socket!.id)
        .map((player) => ({
        ...player,
        position: 0,
      }));

      setOpponentsPosition(playersZeroed);
      setCarPosition({
        id: socket!.id,
        name: 'John doe',
        position: 0,
        lanePosition: playersZeroed.length,
        updatePosition: updatePosition,
      })
    }
  }, [isInGame, players, setCarPosition, setOpponentsPosition, socket, updatePosition]);

  if (isLoading) return <h1>Loading...</h1>;
  if (getLobbyError) return <h1>{getLobbyError}</h1>;
  if (lobbyError) return <h1>{lobbyError}</h1>;
  if (!lobby) return <h1>Couldn't load lobby</h1>;

  if (isInGame) return (
    <Game />
  );

  return (
    <>
      <h1>Lobby</h1>
      <ul>
        {players.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <button onClick={startGame}>Start game</button>
    </>
  )
};

export default Lobby;
