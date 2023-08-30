import {
  createContext,
  useState,
  type PropsWithChildren,
  type FC,
} from 'react';
import { FaceExpressions } from 'face-api.js';

export type Emotion = keyof Omit<FaceExpressions, 'asSortedArray'>;

const INITIAL_VALUE = 'happy';
export const EmotionContext = createContext<{
  emotion: Emotion,
  setEmotion: (emotionProvider: Emotion) => void,
}>({
  emotion: INITIAL_VALUE,
  setEmotion: () => {},
});

const EmotionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [emotion, setEmotion] = useState<Emotion>(INITIAL_VALUE);

  return (
    <EmotionContext.Provider value={{ emotion, setEmotion }}>
      {children}
    </EmotionContext.Provider>
  );
}
 
export default EmotionProvider;
