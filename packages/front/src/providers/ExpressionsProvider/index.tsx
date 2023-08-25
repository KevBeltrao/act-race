import {
  createContext,
  useState,
  type PropsWithChildren,
  type FC,
} from 'react';
import { FaceExpressions } from 'face-api.js';
import { expressionsInitialValue } from '../../constants';

export const ExpressionsContext = createContext<{
  expressions: FaceExpressions,
  setExpressions: (expressions: FaceExpressions) => void,
}>({
  expressions: expressionsInitialValue,
  setExpressions: () => {},
});

const ExpressionsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [expressions, setExpressions] = useState(expressionsInitialValue);

  return (
    <ExpressionsContext.Provider value={{ expressions, setExpressions }}>
      {children}
    </ExpressionsContext.Provider>
  );
}
 
export default ExpressionsProvider;
