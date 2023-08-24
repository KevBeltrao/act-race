import {
  createContext,
  useState,
  type PropsWithChildren,
  type FC,
} from 'react';
import { FaceExpressions } from 'face-api.js';

type Emotion = keyof Omit<FaceExpressions, 'asSortedArray'>;

const emotions: Emotion[] = ['angry', 'disgusted', 'fearful', 'happy', 'neutral', 'sad', 'surprised'];

const randomEmotion: Emotion = emotions[Math.floor(Math.random() * emotions.length)];
export const EmotionContext = createContext<{
  emotion: Emotion,
  setEmotion: (emotionProvider: Emotion) => void,
}>({
  emotion: randomEmotion,
  setEmotion: () => {},
});

const EmotionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [emotion, setEmotion] = useState<Emotion>(randomEmotion);

  return (
    <EmotionContext.Provider value={{ emotion, setEmotion }}>
      {children}
    </EmotionContext.Provider>
  );
}
 
export default EmotionProvider;
