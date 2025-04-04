import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Hls from 'hls.js';

import { Series } from 'src/types';
import * as globalSlice from "src/redux/globalSlice";

interface Props {
  locked: boolean,
  series: Series;
  lastEpisode: number;
  index: number;
  episodeNum: any;
  videoRef: any;
  videoUrl: string;
  muted: boolean;
  setVideoLoading: any;
  setPlaying: any;
  handleTimeUpdate: () => any;
  handleEpisodeChange: (index: number) => any;
}


const HlsPlayer = ({ locked, series, lastEpisode, index, episodeNum, videoRef, videoUrl, muted, setVideoLoading, setPlaying, handleTimeUpdate, handleEpisodeChange}: Props) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (Hls.isSupported() && (lastEpisode - 1 === index)) {
      console.log('잠김 에피소드 ', locked);
      setVideoLoading(true);
      const hls = new Hls({
        fragLoadingMaxRetry: 3,
        manifestLoadingMaxRetry: 3,
        levelLoadingMaxRetry: 3,
      });

      // 초기 로딩시에만 poster 표시
      if (videoRef.current) {
        videoRef.current.poster = `resources/images/thumbnails/${series.id}_thumbnail.png`;
      }

      hls.loadSource(videoUrl);
      hls.attachMedia(videoRef.current);

      // 비디오 재생 시작되면 poster 제거
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (videoRef.current) {
          videoRef.current.poster = '';
        }
      });

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
    } 
  }, [videoUrl, lastEpisode, index])
  
  return (
    <video 
      autoPlay={!locked} 
      playsInline 
      muted={muted} 
      ref={lastEpisode - 1 === index ? videoRef : null}  
      id={`slide-idx-${index}`} 
      onTimeUpdate={handleTimeUpdate} 
      onEnded={() => handleEpisodeChange(episodeNum + 1)} 
    />
  )
}

export default HlsPlayer;