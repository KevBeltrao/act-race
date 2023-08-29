import { useContext, type FC } from 'react';
import { Canvas } from '@react-three/fiber';

import { OpponentsPositionContext } from '../../../providers/OpponentsPositionProvider';

import Webcam from '../../components/web/Webcam/Webcam';
import EmotionController from '../../components/web/EmotionController/EmotionController';

import Player from '../../components/webgl/Player';
import SceneEnvironment from '../../components/webgl/SceneEnvironment';
import withOpponentPosition from '../../HOC/withOpponentPosition';
import withPlayerPosition from '../../HOC/withPlayerPosition';
import OpponentCamera from '../../components/web/OpponentCamera/OpponentCamera';

const OpponentPlayer = withOpponentPosition(Player);

const OriginalPlayer = withPlayerPosition(Player);

const Game: FC = () => {
  const { opponentsPosition } = useContext(OpponentsPositionContext);

  return (
    <>
      <Webcam />

      {opponentsPosition.map((player) => (
        <OpponentCamera key={player.id} opponentPosition={player} />
      ))}
      <EmotionController />
      {/* 
      {opponentsPosition.slice(0, Math.floor(opponentsPosition.length / 2)).map((player) => (
        <OpponentCamera key={player.id} opponentPosition={player} />
        ))}
        {opponentsPosition.slice(Math.floor(opponentsPosition.length / 2)).map((player) => (
          <OpponentCamera key={player.id} opponentPosition={player} />
        ))} */}


      <Canvas shadows>
        <OriginalPlayer index={0} />
        {opponentsPosition.map((player, index) => (
          <OpponentPlayer key={player.id} player={player} index={index + 1} />
        ))}
        {/* 
        <OriginalPlayer index={Math.floor(opponentsPosition.length / 2)} />
        
        {opponentsPosition.slice(Math.floor(opponentsPosition.length / 2)).map((player, index) => (
          <OpponentPlayer key={player.id} player={player} index={Math.floor(opponentsPosition.length / 2) + index + 1} />
        ))} */}

        <SceneEnvironment />
      </Canvas>
    </>
  )
};

export default Game;
