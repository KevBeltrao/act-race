import {
  createContext,
  useState,
  type PropsWithChildren,
  type FC,
} from 'react';

export interface OpponentPosition {
  name: string;
  position: number;
  id: string;
}

export const OpponentsPositionContext = createContext<{
  opponentsPosition: OpponentPosition[],
  setOpponentsPosition: (opponentsPosition: OpponentPosition[]) => void,
}>({
  opponentsPosition: [],
  setOpponentsPosition: () => {},
});

const OpponentsPositionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [opponentsPosition, setOpponentsPosition] = useState<OpponentPosition[]>([]);

  return (
    <OpponentsPositionContext.Provider value={{ opponentsPosition, setOpponentsPosition }}>
      {children}
    </OpponentsPositionContext.Provider>
  );
}
 
export default OpponentsPositionProvider;
