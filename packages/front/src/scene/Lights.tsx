import { type FC } from 'react';

const Lights: FC = () => (
  <>
    <ambientLight intensity={0.8} />
    <directionalLight position={[10, 10, 5]} intensity={1} />
  </>
);

export default Lights;