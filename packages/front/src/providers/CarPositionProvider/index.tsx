import {
  createContext,
  useState,
  type PropsWithChildren,
  type FC,
} from 'react';

export interface CarPosition {
  id: string;
  name: string;
  position: number;
  lanePosition: number;
  updatePosition: (position: number) => void;
}

export const CarPositionContext = createContext<{
  carPosition: CarPosition | null,
  setCarPosition: (carPosition: CarPosition) => void,
}>({
  carPosition: null,
  setCarPosition: () => {},
});

const CarPositionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [carPosition, setCarPosition] = useState<CarPosition | null>(null);

  return (
    <CarPositionContext.Provider value={{ carPosition, setCarPosition }}>
      {children}
    </CarPositionContext.Provider>
  );
};
 
export default CarPositionProvider;
