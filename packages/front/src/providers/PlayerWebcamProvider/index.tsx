import {
  createContext,
  useState,
  type PropsWithChildren,
  type FC,
} from 'react';


interface PlayerWebcamType {
  videoSrc: string;
}

export const PlayersWebcamContext = createContext<{
  playerWebcam: PlayerWebcamType,
  setPlayerWebcam: (Playerswebcam: PlayerWebcamType) => void,
}>({
  playerWebcam: { videoSrc: '' },
  setPlayerWebcam: () => {},
});

const PlayersWebcamProvider: FC<PropsWithChildren> = ({ children }) => {
  const [playerWebcam, setPlayerWebcam] = useState<PlayerWebcamType>({ videoSrc: '' });

  return (
    <PlayersWebcamContext.Provider value={{ playerWebcam, setPlayerWebcam }}>
      {children}
    </PlayersWebcamContext.Provider>
  );
}
 
export default PlayersWebcamProvider;
