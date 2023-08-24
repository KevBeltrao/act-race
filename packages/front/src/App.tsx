import { type FC } from 'react';
import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';

import './App.css';
import Scene from './scene';
import Providers from './providers';

import Car from './components/Car';
import Webcam from './components/Webcam/Webcam';
import Lane from './components/Lane';
import EmotionController from './components/EmotionController/EmotionController';

const App: FC = () => {
  return (
    <Providers>
      <Webcam />
      <EmotionController />

      <Canvas>
        <Car />
        <Lane />


        {/* <OrbitControls /> */}
        <Scene />
      </Canvas>
    </Providers>
  )
}

export default App
