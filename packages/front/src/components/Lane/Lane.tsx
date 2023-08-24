import { FC } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

import laneColor from './laneColor.png';

const length = 1000;

const Lane: FC = () => {
  const colorMap = useTexture(laneColor);
  colorMap.wrapT = THREE.RepeatWrapping;
  colorMap.repeat.set(1, length / 5);

  return (
    <mesh position={[0, length / 2 - 2, 0]}>
      <planeGeometry args={[2, length]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  )
};

export default Lane;
