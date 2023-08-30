import { type FC } from 'react';
import { ToastContainer } from 'react-toastify';

import Providers from './providers';
import Routes from './Routes';
import GlobalStyle from './styles';

const App: FC = () => {
  console.log('API_URL', import.meta.env.VITE_API_URL);

  return (
    <Providers>
      <Routes />

      <GlobalStyle />
      <ToastContainer />
    </Providers>
  )
}

export default App
