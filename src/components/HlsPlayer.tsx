import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Hls from 'hls.js';

import * as globalSlice from "src/redux/globalSlice";

interface Props {
  lastEpisode: number;
  index: number;
  episodeNum: any;
  videoRef: any;
  videoUrl: string;
  muted: boolean;
  setVideoLoading: any;
  handleTimeUpdate: () => any;
  handleEpisodeChange: (index: number) => any;
}


const HlsPlayer = ({ lastEpisode, index, episodeNum, videoRef, videoUrl, muted, setVideoLoading, handleTimeUpdate, handleEpisodeChange}: Props) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (Hls.isSupported() && (lastEpisode - 1 === index)) {
      setVideoLoading(true);
      const hls = new Hls();

      hls.loadSource(videoUrl);

      hls.attachMedia(videoRef.current);

      // 에러 핸들링
      hls.on(Hls.Events.ERROR, function (_event, data) {
        const errorType = data.type;
        console.log('Video hls streaming error: ', errorType);
      
        switch (errorType) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            setVideoLoading(true);
            dispatch(globalSlice.addToast({
              id: Date.now(),
              message: "네트워크가 원할하지 않습니다.",
              duration: 1500,
            }))
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            setVideoLoading(true);
            hls.recoverMediaError();
            break;
          default:
            break;
        }
      });

      if(videoRef.current) {
        videoRef.current.addEventListener("canplay", () => {
          setVideoLoading(false);
        })
      }
    } 

  }, [videoUrl, lastEpisode, index])
  
  return  <video autoPlay playsInline muted={muted} ref={lastEpisode - 1 === index ? videoRef : null}  id={`slide-idx-${index}`} onTimeUpdate={handleTimeUpdate} onEnded={() => handleEpisodeChange(episodeNum + 1)}/>
}

export default HlsPlayer;