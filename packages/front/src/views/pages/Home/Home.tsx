import { type FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useCreateLobby from '../../../hooks/lobby/useCreateLobby';

const Home: FC = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const joinLobby = (code: string) => {
    navigate(`/lobby/${code}`);
  };
  
  const { createLobby, error, isLoading } = useCreateLobby();

  return (
    <div>
      <h1>Home</h1>

      <form>
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Enter lobby code"
        />
        <button
          onClick={() => joinLobby(inputValue)}
          disabled={isLoading || inputValue.length !== 5}
        >Join Lobby</button>
      </form>

      <button onClick={() => createLobby(joinLobby)} disabled={isLoading}>Create Lobby</button>

      {error && <p>{error}</p>}
    </div>
  );
}
 
export default Home;
