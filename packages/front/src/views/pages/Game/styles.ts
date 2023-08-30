import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';

export const GameCanvas = styled(Canvas)`
  width: 100%;
  height: 100%;
`;

export const WebcamsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  z-index: 1;
`;
