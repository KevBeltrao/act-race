import { type PropsWithChildren, type FC } from 'react';
import CarPositionProvider from './CarPositionProvider';
import ExpressionsProvider from './ExpressionsProvider';
import EmotionProvider from './EmotionProvider';
import OpponentsPositionProvider from './OpponentsPositionProvider';
import OpponentsWebcamProvider from './PlayerWebcamProvider';

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ExpressionsProvider>
      <CarPositionProvider>
        <OpponentsPositionProvider>
          <EmotionProvider>
            <OpponentsWebcamProvider>
              {children}
            </OpponentsWebcamProvider>
          </EmotionProvider>
        </OpponentsPositionProvider>
      </CarPositionProvider>
    </ExpressionsProvider>
  );
}
 
export default Providers;
