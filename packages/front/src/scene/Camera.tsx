import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useContext, type FC } from 'react';

import { CarPositionContext } from '../providers/CarPositionProvider';


const Camera: FC = () => {
  const { carPosition } = useContext(CarPositionContext);

  useThree(({ camera }) => {
    camera.rotation.set(THREE.MathUtils.degToRad(50), 0, 0);
    camera.position.set(0, carPosition - 2, 3);
  });

  return null;
};

export default Camera;