import { useContext, type ComponentType, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

import { CarPositionContext } from '../../../providers/CarPositionProvider';
import { ExpressionsContext } from '../../../providers/ExpressionsProvider';
import { EmotionContext } from '../../../providers/EmotionProvider';

interface Props {
  player: {
    id: string;
    name: string;
    position: number;
  };
  index: number;
}

const withPlayerPosition = (Child: ComponentType<Props>) => ({ index }: Pick<Props, 'index'>) => {
  const { carPosition, setCarPosition } = useContext(CarPositionContext);
  const { expressions } = useContext(ExpressionsContext);
  const { emotion } = useContext(EmotionContext);
  const time = useRef(Date.now());

  useFrame(() => {
    if (!carPosition) return;

    const newPosition = carPosition.position + 0.1 * expressions[emotion];

    setCarPosition({
    ...carPosition,
    position: newPosition,
  })

  const now = Date.now();
  if (now - time.current > 50) {
    time.current = now;
    carPosition.updatePosition(newPosition);
  }
});
  
  return (
    <Child player={carPosition!} index={index} />
  );
};
 
export default withPlayerPosition;
