import { type FC } from 'react';

import Car from './Car';

interface WrapperProps {
  carPosition: number;
}

const Wrapper: FC<WrapperProps> = ({ carPosition }) => {
  return (
    <Car carPosition={carPosition} />
  );
}
 
export default Wrapper;
