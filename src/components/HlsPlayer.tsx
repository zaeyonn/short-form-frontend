import { RefObject, useEffect, useRef } from 'react';
import Hls from 'hls.js';

import * as globalSlice from "src/redux/globalSlice";

interface Props {
  currentEp: any;
  videoRef: any;
  videoUrl: string;
  muted: boolean;
  setVideoLoading: any;
  handleTimeUpdate: () => any;
  handleEpisodeChange: (index: number) => any;
}


const HlsPlayer = ({ currentEp, videoRef, videoUrl, muted, setVideoLoading, handleTimeUpdate, handleEpisodeChange}: Props) => {
  
  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();

      hls.loadSource(videoUrl);

      hls.attachMedia(videoRef.current);

      // 에러 핸들링
      hls.on(Hls.Events.ERROR, function (event, data) {
        const errorType = data.type;
      
        switch (errorType) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            globalSlice.addToast({
              id: Date.now(),
              message: "네트워크가 원할하지 않습니다.",
              duration: 1500,
            })
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            globalSlice.addToast({
              id: Date.now(),
              message: "영상 오류입니다.",
              duration: 1500,
            })
            hls.recoverMediaError();
            break;
          default:
            break;
        }
      });
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = videoUrl;
    } 

    videoRef.current.addEventListener("canplay", (event: any) => {
      setVideoLoading(false);
      videoRef.current.play();
    })
  }, [videoUrl])
  
  return  <video muted={muted} ref={videoRef} id="video" onTimeUpdate={handleTimeUpdate} onEnded={() => handleEpisodeChange(currentEp?.episode_num)}/>
}

export default HlsPlayer;