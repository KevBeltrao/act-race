import { type FC } from 'react';

const Lights: FC = () => (
  <>
    <ambientLight intensity={1} />
    <directionalLight castShadow position={[10, 10, 5]} intensity={1} />
  </>
);

export default Lights;