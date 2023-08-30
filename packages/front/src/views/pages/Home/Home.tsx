import { type FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useCreateLobby from '../../../hooks/lobby/useCreateLobby';
import useQuery from '../../../hooks/useQuery';

import { Button, Container, InputContainer } from './styles';

const Home: FC = () => {
  const [nameInput, setNameInput] = useState('');
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const joinLobby = (code: string) => {
    navigate(`/lobby/${code}?name=${nameInput}`);
  };

  const query = useQuery();

  useEffect(() => {
    const lobby = query.get('lobby');

    if (lobby) {
      setInputValue(lobby)
    }
  }, [query]);
  
  const { createLobby, error, isLoading } = useCreateLobby();

  return (
    <Container>
      <h1>Race of Emotions</h1>

      <InputContainer>
        <label htmlFor="name">
          Name: *
          <input
            id="name"
            name="name"
            type="text"
            value={nameInput}
            onChange={(event) => setNameInput(event.target.value)}
            />
        </label>
      </InputContainer>

      <InputContainer>
      <form>
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Enter lobby code"
        />
        <Button
          onClick={() => joinLobby(inputValue)}
          disabled={isLoading || inputValue.length !== 5 || !nameInput}
        >Join Lobby</Button>
      </form>
      </InputContainer>

      <InputContainer>
        <Button
          onClick={() => createLobby(joinLobby)}
          disabled={isLoading || !nameInput}
        >
          Create Lobby
        </Button>
      </InputContainer>

      {error && <p>{error}</p>}
    </Container>
  );
}
 
export default Home;
