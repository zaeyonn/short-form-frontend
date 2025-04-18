import React, { useEffect, useRef, useState } from 'react';

interface SecureVideoPlayerProps {
  subtitleLang: any;
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

const ProgressivePlayer: React.FC<SecureVideoPlayerProps> = ({ unlockEpisode, subtitleLang, videoRef, trackRef ,swiperRef, currentIndex, quality, locked, muted, seriesId, episodeNum, setVideoLoading, index, handleTimeUpdate, handleEpisodeChange }) => {
  const videoUrlsRef = useRef<any>({});
  const [subtitle, setSubtitle] = useState<any>();
  const [subtitleList, setSubtitleList] = useState<any>({"ko": [], "en": []}); 

  
  // 영상 조회
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
        }
      } catch (error) {
        console.error('fetchSignedUrl Error', error);
      }
    };


    if(currentIndex === index) {
      fetchSignedUrl();
    }

  }, [seriesId, episodeNum, currentIndex, index]);

  // 자막 조회
  useEffect(() => {
    if(subtitleLang.code === 'none') return;

    const fetchSubtitle = async () => {
      try {
        const res = await fetch(`/resources/subtitles/${seriesId}/ep${episodeNum}.json`);

        const data = await res.json();        
        setSubtitleList(data); 
      } catch (error) {
        console.error('fetchSubtitle error', error);
      }
    } 

    if(currentIndex === index) {
        fetchSubtitle();
    }

  }, [subtitleLang, currentIndex, index, episodeNum, seriesId])

  useEffect(() => {
    if(subtitleLang.code === 'none' || !(subtitleList.length > 0)) {
      return; 
    }

    const interval = setInterval(() => {
      const video = videoRef.current;
      if (!video) return;

      const currentTime = video.currentTime;
      const activeCue: any = subtitleList.find((cue: any) => currentTime >= cue.start && currentTime <= cue.end);

      setSubtitle(activeCue ? activeCue : "");
    }, 200);

    return () => clearInterval(interval);
  }, [subtitleList, videoRef.current, subtitleLang]);

  return (
    <>
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
         {/* <track 
          src={subtitle.code !== 'none' ? `/resources/subtitles/${seriesId}/ep${episodeNum}_${subtitle.code}.vtt` : ''}
          default 
          ref={(el) => {
            if (swiperRef.current.activeIndex === index) {
              trackRef.current = el;
            }
          }}
          kind="subtitles" 
          srcLang='en'/> */}
      </video>
      {subtitle && (
        <div className='subtitle-wrap'>
          {subtitle.text[subtitleLang.code]}
        </div>
      )}
    </>
  );
};

export default ProgressivePlayer;