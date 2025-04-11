import React, { useEffect } from 'react';

interface SecureVideoPlayerProps {
  videoListRef: any;
  locked: boolean;
  muted: boolean;
  seriesId: number;
  episodeNum: number;
  videoRef: any;
  setVideoLoading: any;
  lastEpisode: number;
  index: number
  handleTimeUpdate: (index: number) => any;
  handleEpisodeChange: (index: number) => any;
}

const ProgressivePlayer: React.FC<SecureVideoPlayerProps> = ({ videoListRef, locked, muted, seriesId, episodeNum, setVideoLoading, lastEpisode, index, handleTimeUpdate, handleEpisodeChange }) => {
  useEffect(() => {
    const fetchSignedUrl = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/series/stream/${seriesId}/${episodeNum}`, {
          credentials: 'include', // 로그인 쿠키 포함
        });
        const data = await res.json();
        if (videoListRef.current[index]) {
          videoListRef.current[index].src = data.url;
          setVideoLoading(false);
        }
      } catch (error) {
        console.error('영상 URL 가져오기 실패', error);
      }
    };

    if(lastEpisode - 1 === index) {
      fetchSignedUrl();

    }
  }, [seriesId, episodeNum, lastEpisode, index]);

  return (
      <video
        ref={(el) => videoListRef.current[index] = el}
        preload='none'
        autoPlay={!locked} 
        playsInline 
        muted={muted}  
        id={`slide-idx-${index}`} 
        style={{ width: '100%', height: '100%', borderRadius: '12px' }}
        onTimeUpdate={() => handleTimeUpdate(index)} 
        onEnded={() => handleEpisodeChange(episodeNum + 1)} 
        poster={`resources/images/thumbnails/${seriesId}_thumbnail.png`}
      >
      </video>
  );
};

export default ProgressivePlayer;