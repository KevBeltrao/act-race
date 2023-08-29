import { useRef, type FC, useState, useEffect, useContext } from 'react';
import * as faceapi from 'face-api.js';
import { ExpressionsContext } from '../../../../providers/ExpressionsProvider';
import { expressionsInitialValue } from '../../../../constants';
import { PlayersWebcamContext } from '../../../../providers/PlayerWebcamProvider';


const Webcam: FC = () => {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [captureVideo, setCaptureVideo] = useState(false);
  const { setExpressions } = useContext(ExpressionsContext);
  const { setPlayerWebcam } = useContext(PlayersWebcamContext);

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoHeight = 480 / 2;
  const videoWidth = 640 / 2;

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(() => setModelsLoaded(true));
    }
    loadModels();
  }, []);

  const startVideo = async () => {
    setCaptureVideo(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 300 } })

      const { current: video } = videoRef;
      if (!video) return;

      video.srcObject = stream;
      video.play();
    } catch (error) {
      console.error(error);
    }
  };


  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (!videoRef.current) return;

      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      const { expressions } = detections?.[0] || {};

      setExpressions(expressions ?? expressionsInitialValue);

      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const canvasContext = canvas.getContext('2d')!;
      canvasContext.drawImage(videoRef.current, 0, 0);

      const image = canvas.toDataURL('image/png');

      if (image) {
        setPlayerWebcam({
          videoSrc: image,
        });
      }
    }, 50)
  }

  const closeWebcam = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    if (!videoRef.current.srcObject) return;
    (videoRef.current.srcObject as MediaStream).getTracks().forEach(stream => stream.stop());
    setCaptureVideo(false);
    setExpressions(expressionsInitialValue);
  };

  return (
    <div style={{ position: 'absolute', zIndex: 1, right: 0 }}>
      <div style={{ textAlign: 'center', padding: '10px' }}>
        {
          captureVideo && modelsLoaded ?
            <button onClick={closeWebcam} style={{ cursor: 'pointer', backgroundColor: 'green', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' }}>
              Close Webcam
            </button>
            :
            <button onClick={startVideo} style={{ cursor: 'pointer', backgroundColor: 'green', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' }}>
              Open Webcam
            </button>
        }
      </div>
      {
        captureVideo ?
          modelsLoaded ?
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                <video ref={videoRef} height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay} style={{ borderRadius: '10px' }} />
              </div>
            </div>
            :
            <div>loading...</div>
          :
          <>
          </>
      }
    </div>
  );
}

export default Webcam;