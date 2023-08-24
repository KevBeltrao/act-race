import { useContext, type FC } from 'react';
import { useFrame } from '@react-three/fiber';

import { CarPositionContext } from '../../providers/CarPositionProvider';
import { ExpressionsContext } from '../../providers/ExpressionsProvider';

import Car from './Car';
import { EmotionContext } from '../../providers/EmotionProvider';

const Wrapper: FC = () => {
  const { carPosition, setCarPosition } = useContext(CarPositionContext);
  const { expressions } = useContext(ExpressionsContext);
  const { emotion } = useContext(EmotionContext);

  useFrame(() => setCarPosition(carPosition + 0.1 * expressions[emotion]));
  
  return (
    <Car carPosition={carPosition} />
  );
}
 
export default Wrapper;
