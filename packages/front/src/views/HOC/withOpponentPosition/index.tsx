import { ComponentType } from 'react';

interface Props {
  player: {
    id: string;
    name: string;
    position: number;
  }
  index: number;
}

const withOpponentPosition = (Child: ComponentType<Props>) => ({ player, index }: Props) => {
  return (
    <Child player={player} index={index} />
  );
}

export default withOpponentPosition;