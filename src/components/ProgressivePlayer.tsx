import React, { useEffect, useRef } from 'react';

interface SecureVideoPlayerProps {
  subtitle: any;
  swiperRef: any;
  currentIndex: number;
  quality: string;
  videoListRef: any;
  locked: boolean;
  muted: boolean;
  seriesId: number;
  episodeNum: number;
  videoRef: any;
  trackRef: any;
  setVideoLoading: any;
  lastEpisode: number;
  unlockEpisode: number;
  index: number
  handleTimeUpdate: (index: number) => any;
  handleEpisodeChange: (index: number) => any;
}

const ProgressivePlayer: React.FC<SecureVideoPlayerProps> = ({ unlockEpisode, subtitle, videoRef, trackRef ,swiperRef, currentIndex, quality, locked, muted, seriesId, episodeNum, setVideoLoading, index, handleTimeUpdate, handleEpisodeChange }) => {
  const videoUrlsRef = useRef<any>({});
  
  useEffect(() => {
    const fetchSignedUrl = async () => {
      try {
        setVideoLoading(true);
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/series/videos/${seriesId}/${episodeNum}`, {
          credentials: 'include',
        });
        const data = await res.json();
        
        setVideoLoading(false);

        if (videoRef.current) {
          videoRef.current.src = data.videos_url[quality];
          videoUrlsRef.current = data.videos_url;

          // if(subtitle.code !== 'none') {
          //   trackRef.current.src = trackRef.current.src = `/resources/subtitles/${seriesId}/ep${episodeNum}_${subtitle.code}.vtt`;
          // }
        }
      } catch (error) {
        console.error('fetchSignedUrl Error', error);
      }
    };

    if(currentIndex === index) {
    console.log('currentIndex index', currentIndex, index, unlockEpisode);
      fetchSignedUrl();

    }
  }, [seriesId, episodeNum, currentIndex, index, unlockEpisode]);

  return (
      <video
        src={(quality && videoUrlsRef.current ? videoUrlsRef.current[quality] : '')}
        ref={(el) => {
          if (swiperRef.current.activeIndex === index) {
            videoRef.current = el;
          }
        }}
        preload='none'
        autoPlay={!locked} 
        playsInline 
        muted={muted}  
        id={`slide-idx-${index}`} 
        onTimeUpdate={() => handleTimeUpdate(index)} 
        onEnded={() => handleEpisodeChange(episodeNum + 1)} 
        poster={`resources/images/thumbnails/${seriesId}_thumbnail.png`}>
         <track 
          src={subtitle.code !== 'none' ? `/resources/subtitles/${seriesId}/ep${episodeNum}_${subtitle.code}.vtt` : ''}
          default 
          ref={(el) => {
            if (swiperRef.current.activeIndex === index) {
              trackRef.current = el;
            }
          }}
          kind="subtitles" 
          srcLang='en'/>
      </video>
  );
};

export default ProgressivePlayer;