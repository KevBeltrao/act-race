import { type FC, useEffect, useContext } from 'react';
import { EmotionContext } from '../../../../providers/EmotionProvider';

const emotions = {
  neutral: '😐',
  happy: '😀',
  sad: '😢',
  angry: '😡',
  fearful: '😱',
  disgusted: '🤮',
  surprised: '😮',
};

const EmotionController: FC = () => {
  const { emotion, setEmotion } = useContext(EmotionContext);

  useEffect(() => {
    setTimeout(() => {
      const generateNewEmotion = () => {
        const emotionsArray = Object.keys(emotions);
  
        const randomEmotion = emotionsArray[Math.floor(Math.random() * emotionsArray.length)] as keyof typeof emotions ;
  
        if (randomEmotion !== emotion) {
          setEmotion(randomEmotion);
        } else {
          generateNewEmotion();
        }
      };

      generateNewEmotion();
    }, 10 * 1000);
  }, [emotion, setEmotion]);

  return (
    <div style={{ position: 'absolute', zIndex: 1, fontSize: 24 }}>
      {emotions[emotion]} {emotion}
    </div>
  );
}
 
export default EmotionController;