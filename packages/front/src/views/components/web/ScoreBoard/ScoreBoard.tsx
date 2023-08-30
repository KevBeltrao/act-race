import { useContext, type FC, useMemo } from 'react';

import { CarPositionContext } from '../../../../providers/CarPositionProvider';
import { OpponentsPositionContext } from '../../../../providers/OpponentsPositionProvider';

import { Container, OrderedList } from './styles';

const ScoreBoard: FC = () => {
  const { carPosition } = useContext(CarPositionContext);
  const { opponentsPosition } = useContext(OpponentsPositionContext);

  const ranking = useMemo(() => {
    if (!carPosition) return [];

    const { name, position, id } = carPosition;

    const players = [
      { name, position, id },
      ...opponentsPosition.map((player) => ({
        name: player.name,
        position: player.position,
        id: player.id,
        })),
    ];

    return players.sort((a, b) => a.position - b.position);
  }, [carPosition, opponentsPosition]);

  return (
    <Container>
      <OrderedList>
        {ranking.map((player) => (
          <li key={player.id}>
            <span>{player.name}</span>
          </li>
        ))}
      </OrderedList>
    </Container>
  );
}
 
export default ScoreBoard;