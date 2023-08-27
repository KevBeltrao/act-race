import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { type FC } from 'react';

import Home from './views/pages/Home/Home';
import Lobby from './views/pages/Lobby/Lobby';
import Game from './views/pages/Game/Game';

const Routes: FC = () => {  
  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/lobby/:code', element: <Lobby /> },
    { path: '/game/', element: <Game /> },
  ]);

  return (
    <RouterProvider router={router} />
  )
};

export default Routes;
