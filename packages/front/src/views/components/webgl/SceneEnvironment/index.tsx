import { type FC } from 'react';
import Camera from './Camera';
import Lights from './Lights';

const Scene: FC = () => (
  <>
    <Lights />
    <Camera />
  </>
);

export default Scene;
