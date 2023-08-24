import { type FC } from 'react';

interface CarProps {
  carPosition: number;
}

const Car: FC<CarProps> = ({ carPosition }) => (
  <mesh position={[0, carPosition, 0.5]}>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="hotpink" />
  </mesh>
);

export default Car;
