import React, { useEffect } from 'react';

interface SecureVideoPlayerProps {
  locked: boolean;
  muted: boolean;
  seriesId: number;
  episodeNum: number;
  videoRef: any;
  setVideoLoading: any;
  lastEpisode: number;
  index: number
  handleTimeUpdate: () => any;
  handleEpisodeChange: (index: number) => any;
}

const ProgressivePlayer: React.FC<SecureVideoPlayerProps> = ({ locked, muted, seriesId, episodeNum, videoRef, setVideoLoading, lastEpisode, index, handleTimeUpdate, handleEpisodeChange }) => {
  useEffect(() => {
    const fetchSignedUrl = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/series/stream/${seriesId}/${episodeNum}`, {
          credentials: 'include', // 로그인 쿠키 포함
        });
        const data = await res.json();
        if (videoRef.current) {
          videoRef.current.src = data.url;
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
        autoPlay={!locked} 
        playsInline 
        muted={muted}  
        id={`slide-idx-${index}`} 
        ref={lastEpisode - 1 === index ? videoRef : null}
        style={{ width: '100%', height: '100%', borderRadius: '12px' }}
        onTimeUpdate={handleTimeUpdate} 
        onEnded={() => handleEpisodeChange(episodeNum + 1)} 
        poster={`resources/images/thumbnails/${seriesId}_thumbnail.png`}
      >
      </video>
  );
};

export default ProgressivePlayer;