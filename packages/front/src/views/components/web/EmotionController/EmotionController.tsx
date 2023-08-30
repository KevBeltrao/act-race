import { type FC, useContext } from 'react';

import { EmotionContext } from '../../../../providers/EmotionProvider';

import { Container } from './styles';

const emotions = {
  neutral: '😐',
  happy: '😀',
  sad: '😢',
  angry: '😡',
  fearful: '😱',
  disgusted: '🤮',
  surprised: '😮',
} as const;

const EmotionController: FC = () => {
  const { emotion } = useContext(EmotionContext);

  return (
    <Container>
      {emotions[emotion]} {emotion}
    </Container>
  );
}
 
export default EmotionController;