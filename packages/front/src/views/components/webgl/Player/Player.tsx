import { FC } from 'react';

import Car from '../Car'
import Lane from '../Lane'

interface PlayerProps {
  player: {
    id: string;
    name: string;
    position: number;
  };
  index: number;
}

const Player: FC<PlayerProps> = ({ player, index }) => {
  return (
    <group position={[index * 2, 0, 0]}>
      <Car carPosition={player.position} />
      <Lane />
    </group>
  );
};
 
export default Player;
