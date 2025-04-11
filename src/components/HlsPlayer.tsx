import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Hls from 'hls.js';

import { Series } from 'src/types';
import * as globalSlice from "src/redux/globalSlice";

interface Props {
  quality: string,
  locked: boolean,
  series: Series;
  lastEpisode: number;
  currentTimeRef: any;
  index: number;
  episodeNum: any;
  hlsRef: any;
  videoRef: any;
  videoUrl: string;
  muted: boolean;
  setVideoLoading: any;
  setPlaying: any;
  handleTimeUpdate: () => any;
  handleEpisodeChange: (index: number) => any;
}


const HlsPlayer = ({ quality, locked, series, hlsRef, currentTimeRef, lastEpisode, index, episodeNum, videoRef, videoUrl, muted, setVideoLoading, setPlaying, handleTimeUpdate, handleEpisodeChange}: Props) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    let hls: any;
    if (Hls.isSupported() && (lastEpisode - 1 === index)) {
      console.log('잠김 에피소드 ', locked);
      setVideoLoading(true);
      hls = new Hls({
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
        liveSyncDuration: 10
      });
      hlsRef.current = hls;

      hls.loadSource(videoUrl);
      hls.attachMedia(videoRef.current);

      if(quality === 'Auto') {
        hlsRef.current.currentLevel = -1;
      } else if(quality === '480p') {
        hlsRef.current.currentLevel = 0;
      } else if(quality === '720p') {
        hlsRef.current.currentLevel = 1;
      } else if(quality === '1080p') {
        hlsRef.current.currentLevel = 2;
      } 

      // 비디오 재생 시작되면 poster 제거
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log('video play')
      });

      hls.once(Hls.Events.LEVEL_SWITCHED, () => {
        console.log('화질 변경됨')
        videoRef.current.currentTime = currentTimeRef.current;
      });

      // 에러 핸들링
      hls.on(Hls.Events.ERROR, function (_event: any, data: any) {
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
        // 마지막 프레임 유지를 위한 스타일 설정
        videoRef.current.style.visibility = 'visible';
        
        videoRef.current.addEventListener("canplay", () => {
          setVideoLoading(false);
          if (!locked) {
            setPlaying(true);
          }
        });

        // 버퍼링 시작할 때
        videoRef.current.addEventListener("waiting", () => {
          setVideoLoading(true);
        });

        // 버퍼링 끝나고 재생 가능할 때
        videoRef.current.addEventListener("playing", () => {
          setVideoLoading(false);
        });
      }

    } else if(hls) {
      hls.destroy();
    }

    return () => {
      if(hls) {
        hls.destroy();
      }
    }
  }, [videoUrl, lastEpisode, index, quality, videoRef.current])
  
  return (
    <video 
      autoPlay={!locked} 
      playsInline 
      muted={muted} 
      ref={lastEpisode - 1 === index ? videoRef : null}  
      id={`slide-idx-${index}`} 
      onTimeUpdate={handleTimeUpdate} 
      onEnded={() => handleEpisodeChange(episodeNum + 1)} 
      poster={`resources/images/thumbnails/${series.id}_thumbnail.png`}
    />
  )
}

export default HlsPlayer;