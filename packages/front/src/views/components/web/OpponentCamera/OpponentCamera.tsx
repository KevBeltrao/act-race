import { type FC } from "react";
import { OpponentPosition } from "../../../../providers/OpponentsPositionProvider";

interface OpponentCameraProps {
  opponentPosition: OpponentPosition;
}

const OpponentCamera: FC<OpponentCameraProps> = ({ opponentPosition }) => {
  const videoHeight = 480 / 2;
  const videoWidth = 640 / 2;

  return (
    <img src={opponentPosition.videoSrc} style={{
      height: videoHeight,
      width: videoWidth,
    }} />
  );
}
 
export default OpponentCamera;
