import React, { useEffect, useRef } from 'react';

interface SecureVideoPlayerProps {
  currentIndex: number;
  quality: string;
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

const ProgressivePlayer: React.FC<SecureVideoPlayerProps> = ({ currentIndex, quality, videoListRef, locked, muted, seriesId, episodeNum, setVideoLoading, index, handleTimeUpdate, handleEpisodeChange }) => {
  const videoUrlsRef = useRef<any>({});
  
  useEffect(() => {
    const fetchSignedUrl = async () => {
      try {
        setVideoLoading(true);
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/series/videos/${seriesId}/${episodeNum}`, {
          credentials: 'include',
        });
        const data = await res.json();
        if (videoListRef.current[index]) {
          videoListRef.current[index].src = data[quality];
          videoUrlsRef.current = data;
          setVideoLoading(false);
        }
      } catch (error) {
        console.error('fetchSignedUrl Error', error);
      }
    };

    if(currentIndex === index) {
      fetchSignedUrl();

    }
  }, [seriesId, episodeNum, currentIndex, index]);

  return (
      <video
        src={(quality && videoUrlsRef.current ? videoUrlsRef.current[quality] : '')}
        ref={(el) => videoListRef.current[index] = el}
        preload='none'
        autoPlay={!locked} 
        playsInline 
        muted={muted}  
        id={`slide-idx-${index}`} 
        onTimeUpdate={() => handleTimeUpdate(index)} 
        onEnded={() => handleEpisodeChange(episodeNum + 1)} 
        poster={`resources/images/thumbnails/${seriesId}_thumbnail.png`}
      >
      </video>
  );
};

export default ProgressivePlayer;