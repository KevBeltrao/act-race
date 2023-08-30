import io from 'socket.io-client';

const createWebsocket = () => {
  const socket = io(import.meta.env.VITE_API_URL);
  return socket;
};

export default createWebsocket;
