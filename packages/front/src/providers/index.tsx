import { type PropsWithChildren, type FC } from 'react';
import CarPositionProvider from './CarPositionProvider';
import ExpressionsProvider from './ExpressionsProvider';
import EmotionProvider from './EmotionProvider';
import OpponentsPositionProvider from './OpponentsPositionProvider';

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ExpressionsProvider>
      <CarPositionProvider>
        <OpponentsPositionProvider>
          <EmotionProvider>
            {children}
          </EmotionProvider>
        </OpponentsPositionProvider>
      </CarPositionProvider>
    </ExpressionsProvider>
  );
}
 
export default Providers;
