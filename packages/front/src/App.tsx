import { type FC } from 'react';

import './App.css';
import Providers from './providers';
import Routes from './Routes';

const App: FC = () => {
  return (
    <Providers>
      <Routes />
    </Providers>
  )
}

export default App
