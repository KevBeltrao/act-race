import io from 'socket.io-client';

const createWebsocket = () => {
  const socket = io(import.meta.env.VITE_WEBSOCKET_URL);
  return socket;
};

export default createWebsocket;
