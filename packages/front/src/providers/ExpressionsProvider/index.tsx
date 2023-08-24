import {
  createContext,
  useState,
  type PropsWithChildren,
  type FC,
} from 'react';
import { FaceExpressions } from 'face-api.js';

const INITIAL_VALUE: FaceExpressions = {
  angry: 0,
  disgusted: 0,
  fearful: 0,
  happy: 0,
  neutral: 0,
  sad: 0,
  surprised: 0,
  asSortedArray: () => [],
};

export const ExpressionsContext = createContext<{
  expressions: FaceExpressions,
  setExpressions: (expressions: FaceExpressions) => void,
}>({
  expressions: INITIAL_VALUE,
  setExpressions: () => {},
});

const ExpressionsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [expressions, setExpressions] = useState(INITIAL_VALUE);

  return (
    <ExpressionsContext.Provider value={{ expressions, setExpressions }}>
      {children}
    </ExpressionsContext.Provider>
  );
}
 
export default ExpressionsProvider;
