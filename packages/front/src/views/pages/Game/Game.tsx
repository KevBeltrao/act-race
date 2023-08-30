import { useContext, type FC } from 'react';

import { OpponentsPositionContext } from '../../../providers/OpponentsPositionProvider';

import Webcam from '../../components/web/Webcam/Webcam';
import EmotionController from '../../components/web/EmotionController/EmotionController';

import Player from '../../components/webgl/Player';
import SceneEnvironment from '../../components/webgl/SceneEnvironment';
import withOpponentPosition from '../../HOC/withOpponentPosition';
import withPlayerPosition from '../../HOC/withPlayerPosition';
import OpponentCamera from '../../components/web/OpponentCamera/OpponentCamera';

import { GameCanvas, WebcamsContainer } from './styles';
import ScoreBoard from '../../components/web/ScoreBoard/ScoreBoard';

const OpponentPlayer = withOpponentPosition(Player);

const OriginalPlayer = withPlayerPosition(Player);

const Game: FC = () => {
  const { opponentsPosition } = useContext(OpponentsPositionContext);

  return (
    <>
      <WebcamsContainer>
        <Webcam />

        {opponentsPosition.map((player) => (
          <OpponentCamera key={player.id} opponentPosition={player} />
        ))}
      </WebcamsContainer>

      <EmotionController />

      <ScoreBoard />

      <GameCanvas shadows>
        <OriginalPlayer index={0} />
        {opponentsPosition.map((player, index) => (
          <OpponentPlayer key={player.id} player={player} index={index + 1} />
        ))}
        <SceneEnvironment />
      </GameCanvas>
    </>
  )
};

export default Game;
