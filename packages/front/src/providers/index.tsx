import { type PropsWithChildren, type FC } from 'react';
import CarPositionProvider from './CarPositionProvider';
import ExpressionsProvider from './ExpressionsProvider';
import EmotionProvider from './EmotionProvider';

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ExpressionsProvider>
      <CarPositionProvider>
        <EmotionProvider>
          {children}
        </EmotionProvider>
      </CarPositionProvider>
    </ExpressionsProvider>
  );
}
 
export default Providers;
