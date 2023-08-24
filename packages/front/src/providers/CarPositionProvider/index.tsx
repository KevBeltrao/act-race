import {
  createContext,
  useState,
  type PropsWithChildren,
  type FC,
} from 'react';


export const CarPositionContext = createContext<{
  carPosition: number,
  setCarPosition: (carPosition: number) => void,
}>({
  carPosition: 0,
  setCarPosition: () => {},
});

const CarPositionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [carPosition, setCarPosition] = useState(0);

  return (
    <CarPositionContext.Provider value={{ carPosition, setCarPosition }}>
      {children}
    </CarPositionContext.Provider>
  );
}
 
export default CarPositionProvider;
