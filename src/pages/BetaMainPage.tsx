import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

import * as globalSlice from "src/redux/globalSlice";
import * as userSlice from "src/redux/userSlice";

import { displayPopType, authType } from "common/define";
import { User } from "src/types";
import UIShortFormSwiper from "components/ui/UIShortFormSwiper";
import UIBottomSheetEpisodeGrid from "../components/ui/bottomsheet/UIBottomSheetEpisodeGrid";
import UILayerLockedEpisode from "components/ui/layer/UILayerLockedEpisode";
import UIPopPaymentProductList from "components/ui/popup/UIPopPaymentProductList";
// import TossPayment from "components/ui/payments/TossPayment";
import UIPopLogin from "components/ui/popup/UIPopLogin";
import UILayerSpinner from "components/ui/layer/UILayerSpinner";
import UILeftMenu from "components/ui/UILeftMenu";
import UIBottomSheetLogin from "components/ui/bottomsheet/UIBottomSheetLogin";
import UIBottomSheetVideoOption from "components/ui/bottomsheet/UIBottomSheetVideoOption";
import UIBottomSheetQuality from "components/ui/bottomsheet/UIBottomSheetQuality";
import UIBottomSheetSpeed from "components/ui/bottomsheet/UIBottomSheetSpeed";

const BetaMainPage = ({}) => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    series,
    episodeListResult,
    episodeListError,
    seriesInfoResult,
    seriesInfoError,
    isMobile,
    displayPopName,
    productListResult,
    productListError,
    visibleBottomSheetLogin
  } = useSelector((state: any) => state.global);
  const {
    user,
    subscription,
    addSeriesProgressResult,
    addSeriesProgressError,
    userSeriesProgressResult,
    userSeriesProgressError,
    updateSeriesProgressResult,
    updateSeriesProgressError,
    updateSeriesUnlockEpisodeResult,
    updateSeriesUnlockEpisodeError,
    addSeriesKeepError,
    addSeriesKeepResult,
    removeSeriesKeepError,
    removeSeriesKeepResult,
    userSeriesKeepListError,
    userSeriesKeepListResult,
    authSnsError,
    authSnsResult,
    usersPointDeductResult,
    usersPointDeductError,
  } = useSelector((state: any) => state.user);

  const [loading, setLoading] = useState<boolean>(true);
  const [videoLoading, setVideoLoading] = useState<boolean>(true);
  const [paymentLoading, setPaymentLoading] = useState<boolean>(false);
  

  const [playing, setPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [currentEp, setCurrentEp] = useState<any>();
  const [episodeList, setEpisodeList] = useState([]);
  const [keep, setKeep] = useState<boolean>();
  const [keepCount, setKeepCount] = useState<any>();
  const [locked, setLocked] = useState(false);
  const [unlockEpisode, setUnlockEpisode] = useState<number>();
  const [lastEpisode, setLastEpisode] = useState<number>(0);
  const [muted, setMuted] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1);
  const [quality, setQuality] = useState<string>("Auto");
  // const [fullscreen, setFullscreen] = useState<boolean>(false);

  const [visibleTools, setVisibleTools] = useState(true);
  const [visibleMenu, setVisibleMenu] = useState<boolean>(false);
  const [visibleBottomSheetEpisode, setVisibleBottomSheetEpisode] = useState(false);
  const [visibleBottomSheetOption, setVisibleBottomSheetOption] = useState(false);
  const [visibleBottomSheetQuality, setVisibleBottomSheetQuality] = useState(false);
  const [visibleBottomSheetSpeed, setVisibleBottomSheetSpeed] = useState(false);

  const loginSheetRef = useRef<any>(null);
  const optionSheetRef = useRef<any>(null);
  const qualitySheetRef = useRef<any>(null);
  const speedSheetRef = useRef<any>(null);
  const swiperRef = useRef<any>(null);
  const videoRef = useRef<any>(null);
  const hideToolsTimeout = useRef<any>();
  const hlsRef = useRef<any>(null);
  // const videoContainerRef = useRef<HTMLDivElement>(null);
  const sequenceCountRef = useRef<number>(0);
  const progressChangingRef = useRef<boolean>(false);
  const blobUrlRef = useRef<string>("");
  // const abortControllerRef = useRef<AbortController | null>(null);

  const seriesIdRef = useRef<string>('1');
  

  const currentTimeRef = useRef<number>(0);

  // const blobUrlCache = new Map<string, string>();

  // const handleClose = () => {
  //   navigate(-1);
  // };

  const handleMenuOpen = () => {
    setVisibleMenu(true);
  };

  const handleMenuClose = () => {
    setVisibleMenu(false);
  };

  // 도구 토글
  const toggleTools = () => {
    setVisibleTools(!visibleTools);

    if (!visibleTools) {
      clearTimeout(hideToolsTimeout.current);
    }
  };

  // 재생 / 일시정지 토글
  const togglePlay = (event: any) => {
    event.stopPropagation();

    if (unlockEpisode && currentEp?.episode_num > unlockEpisode) {
      setLocked(true);
      return;
    }

    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  // // 비디오 URL을 Blob URL로 변환 함수
  // const convertToBlobURL = async (
  //   videoUrl: string
  // ): Promise<string | undefined> => {
  //   // 캐시된 Blob URL이 있는지 확인
  //   if (blobUrlCache.has(videoUrl)) {
  //     return blobUrlCache.get(videoUrl);
  //   }

  //   try {

  //     // 이전 요청이 있다면 취소
  //   if (abortControllerRef.current) {
  //     abortControllerRef.current.abort();
  //   }
      
  //     // abortController 생성
  //     abortControllerRef.current = new AbortController();
      
  //     // video url로 부터 데이터 fetch
  //     const response = await fetch(videoUrl, {
  //       cache: "force-cache",
  //       signal: abortControllerRef.current.signal
  //     });

  //     if (!response.ok) throw new Error("Network response was not ok");

  //     // response를 blob로 변환
  //     const blob = await response.blob();

  //     // blob URL 생성
  //     blobUrlRef.current = URL.createObjectURL(blob);

  //     // 캐시에 저장
  //     blobUrlCache.set(videoUrl, blobUrlRef.current);

  //     return blobUrlRef.current;
  //   } catch (error: any) {
  //     if (error.name === 'AbortError') {
  //       console.log('Fetch aborted');
  //       return;
  //     }
  //     console.error("Error converting video to blob URL:", error);
  //     throw error;
  //   } finally {
  //     // 완료된 controller 정리 
  //     abortControllerRef.current = null;
  //   }
  // };

  // // 캐시 정리 함수
  // const clearBlobUrlCache = () => {
  //   blobUrlCache.forEach((blobUrl) => {
  //     URL.revokeObjectURL(blobUrl);
  //   });

  //   blobUrlCache.clear();
  // };


  const signInProcess = (code: string, authType: string) => {
    dispatch(userSlice.authSns({ code, userId: user?.id, authType }));
  };

  // 재생 시간 업데이트
  const handleTimeUpdate = () => {
    if (
      videoRef.current &&
      videoRef.current.currentTime &&
      videoRef.current.duration
    ) {
      currentTimeRef.current = videoRef.current.currentTime;

      const duration = videoRef.current.duration;

      setProgress((currentTimeRef.current / duration) * 100);
    }
  };

  // 재생바 드래그로 위치 변경
  const handleProgressChange = (event: any) => {
    event.stopPropagation();
    const newProgress = event.target.value;

    if (videoRef.current) {
      const duration = videoRef.current.duration;
      videoRef.current.currentTime = (newProgress / 100) * duration;
      setProgress(newProgress);
    }
  };

  // 재생바 터치 시작 이벤트
  const handleProgressTouchStart = (event: any) => {
    event.stopPropagation();
    setPlaying(false);
    progressChangingRef.current = true;
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  // 재생바 터지 종료 이벤트
  const handleProgressTouchEnd = (event: any) => {
    event.stopPropagation();
    progressChangingRef.current = false;
    setPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleSlideChangeStart = (swiper: any) => {
    if (swiper.activeIndex === unlockEpisode) {
      swiperRef.current.slideTo(swiper.activeIndex, 0);
    }
  };

  const handleLoginClose = useCallback(() => {
    dispatch(globalSlice.toggleBottomSheetLogin({}));
  }, []);

  // Short Form Slide 변경
  const handleSlideChange = (swiper: any) => {
    const slidedVideo = document.getElementById(
      `slide-idx-${swiper.activeIndex}`
    );

    currentTimeRef.current = 0;

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();

      videoRef.current = slidedVideo;
      // setPlaying(true);
    }

    setCurrentEp(episodeList[swiper.activeIndex]);

    if (unlockEpisode && swiper.activeIndex + 1 <= unlockEpisode) {
      dispatch(
        userSlice.updateSeriesProgress({
          userId: user.id,
          seriesId: seriesIdRef.current,
          ep: swiper.activeIndex + 1,
        })
      );
    }
  };

  /*
  * 에피소드 회차 변경
  * @Params
  * episodeNum : 변경할 회차
  */ 
  const handleEpisodeChange = useCallback((episodeNum: number) => {
    const index = episodeNum - 1;
      
    setCurrentEp(episodeList[index]);
    setProgress(0);
    currentTimeRef.current = 0;

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      //videoRef.current.pause();
    }

    if (index === unlockEpisode) {
      setLocked(true);
    }

    // if (index + 1 !== currentEp?.episode_num) {
    //   URL.revokeObjectURL(blobUrlRef.current);
    // }

    if (swiperRef.current) swiperRef.current.slideTo(index, 0);
    
    setVisibleBottomSheetEpisode(false);

    // if (isMobile) {
    //   Beta
    //   if (swiperRef.current) swiperRef.current.slideTo(index, 0);
    //   setVisibleBottomSheetEpisode(false);
    // } else if (!isMobile && videoRef.current) {
    //   dispatch(
    //     userSlice.updateSeriesProgress({
    //       userId: user.id,
    //       seriesId: seriesIdRef.current,
    //       ep: index + 1,
    //       })
    //     );
    //   }
    },[episodeList, seriesIdRef.current, currentEp]);

  const handleBottomSheetOpen = useCallback(() => {
    setVisibleBottomSheetEpisode(true);
  }, []);

  const handleBottomSheetClose = useCallback(() => {
    setVisibleBottomSheetEpisode(false);
  }, []);
  
  const handleOptionClose = useCallback(() => {
    setVisibleBottomSheetOption(false);
  }, []);

  const handleOptionOpen = useCallback(() => {
    setVisibleBottomSheetOption(true);
  }, []);

  const handleQualityOpen = useCallback(() => {
    optionSheetRef.current.handleClose();
    setVisibleBottomSheetQuality(true);
  }, []);

  
  const handleQualityClose = useCallback(() => {
    setVisibleBottomSheetQuality(false);
  }, []);

  
  const handleSpeedOpen = useCallback(() => {
    optionSheetRef.current.handleClose();
    setVisibleBottomSheetSpeed(true);
  }, []);

  
  const handleSpeedClose = useCallback(() => {
    setVisibleBottomSheetSpeed(false);
  }, []);

  const handleQualityChange = (quality: string) => {
    console.log('handleQualityChange quality', hlsRef.current.levels);
    setQuality(quality);
    
    if(quality === 'Auto') {
      hlsRef.current.currentLevel = -1;
    } else if(quality === '480p') {
      hlsRef.current.currentLevel = 0;
    } else if(quality === '720p') {
      hlsRef.current.currentLevel = 1;
    } else if(quality === '1080p') {
      hlsRef.current.currentLevel = 2;
    } 
    qualitySheetRef.current.handleClose();
  };

  const handleSpeedChange = useCallback((speed: number) => {
    setSpeed(speed);
    videoRef.current.playbackRate = speed;
    speedSheetRef.current.handleClose();
  }, [videoRef.current]);

  const handleSeriesKeep = () => {
    setKeep(!keep);

    if (keep) {
      setKeepCount(keepCount - 1 >= 0 ? keepCount - 1 : 0);
      dispatch(
        userSlice.removeSeriesKeep({
          userId: user.id,
          seriesIdList: [seriesIdRef.current],
        })
      );
    } else {
      setKeepCount(keepCount + 1);
      dispatch(
        userSlice.addSeriesKeep({
          userId: user.id,
          seriesId: seriesIdRef.current,
        })
      );
    }
  };

  const handleEpisodeLock = useCallback(() => {
    setLocked(true);
    setVisibleBottomSheetEpisode(false);

    // videoRef.current.pause();
  }, []);

  const handleLockedClose = () => {
    setLocked(false);
  };

  const handlePaymentComplete = () => {

    // 사용자 잠금 회차 업데이트
    dispatch(
      userSlice.updateSeriesUnlockEpisode({
        userId: user.id,
        seriesId: seriesIdRef.current,
        ep: unlockEpisode ? unlockEpisode + 1 : "",
      })
    );
  };

  const handlePointUse = () => {

    // 사용자 코인 차감
    dispatch(userSlice.usersPointDeduct({ userId: user.id, point: series.req_point }));
  }

  const handleMuted = (event: any) => {
    event.stopPropagation();

    setMuted(!muted);
    videoRef.current.muted = !videoRef.current.muted;
  };
  
  

  // const handleFullscreen = (event: any) => {
  //   event.stopPropagation();

  //   if (fullscreen) {
  //     setFullscreen(false);
  //     document.exitFullscreen();
  //   } else {
  //     setFullscreen(true);
  //     videoContainerRef.current?.requestFullscreen();
  //   }
  // };

  // const handleEpisodeClick = async (index: number) => {
  //   if(abortControllerRef.current) {
  //     await abortControllerRef.current.abort();
  //   }

  //   if (index + 1 === currentEp?.episode_num) {
  //     return;
  //   }

  //   if (unlockEpisode && index <= unlockEpisode) {
  //     handleEpisodeChange(index + 1);
  //   }

  //   if (index === unlockEpisode) {
  //     videoRef.current.currentTime = 0;
  //     currentTimeRef.current = 0;
  //     setProgress(0);
  //     setLocked(true);
  //   }

  //   if (unlockEpisode && index > unlockEpisode) {
  //     dispatch(
  //       globalSlice.addToast({
  //         id: Date.now(),
  //         message: "앞에 놓친 에피소드가 있어요.",
  //         duration: 1500,
  //       })
  //     );
  //   }
  // };

  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      // setFullscreen(false);
    }
  };

  // const handlePlayerClick = () => {
  //   if (playing) {
  //     videoRef.current.pause();
  //     setPlaying(false);
  //   } else {
  //     videoRef.current.play();
  //     setPlaying(true);
  //   }
  // };

  const handleVideoEnded = () => {
    if (currentEp?.episode_num < episodeList.length) {
      swiperRef.current.slideTo(currentEp?.episode_num, 0);
    }
  };

  const handleLoginOpen = useCallback(() => {
    
    console.log('handleLoginClose 1');
    dispatch(globalSlice.toggleBottomSheetLogin({}));
    // if (isMobile) {
    //   setVisibleBottomSheetLogin(true);
    // } else {
    //   dispatch(globalSlice.setDisplayPopName(displayPopType.POPUP_LOGIN.name));
    // }
  }, []);

  // 4초 후 Player Tool UI 숨김 처리
  useEffect(() => {
    if (visibleTools && playing) {
      hideToolsTimeout.current = setTimeout(() => {
        setVisibleTools(false);
      }, 4000);
    } else if (!playing && visibleTools) {
      clearTimeout(hideToolsTimeout.current);
    }
  }, [visibleTools, playing]);

  // 사용자 코인 차감 결과
  useEffect(() => {
    if (usersPointDeductError) {
      console.log('usersPointDeductError ', usersPointDeductError);
      
      dispatch(userSlice.clearUserState('usersPointDeductError'));
    }

    if (usersPointDeductResult && usersPointDeductResult.status === 201) {
      console.log('usersPointDeductResult ', usersPointDeductResult);

      // 사용자 코인 정보 업데이트
      dispatch(userSlice.setUser(usersPointDeductResult.data))

      // 사용자 잠금 회차 업데이트
      dispatch(
        userSlice.updateSeriesUnlockEpisode({
          userId: user.id,
          seriesId: seriesIdRef.current,
          ep: unlockEpisode ? unlockEpisode + 1 : "",
        })
      );

      dispatch(userSlice.clearUserState('usersPointDeductResult'));
    }
  }, [usersPointDeductResult, usersPointDeductError, unlockEpisode])

  // SNS 로그인 결과
  useEffect(() => {
    if (authSnsError) {
      console.log('authSnsError ', authSnsError);
      dispatch(globalSlice.addToast({
        id: Date.now(),
        message: authSnsError.response.data.error,
        duration: 3000,
      }))

      dispatch(userSlice.clearUserState("authSnsError"));
    }

    if (authSnsResult && authSnsResult.status === 200) {
      const user:User = authSnsResult.data;

      
      if(authSnsResult.data?.request_auth_type !== user.auth) {
        dispatch(globalSlice.addToast({
          id: Date.now(),
          message: `${authType[user.auth].name}로 가입된 계정입니다.`,
          duration: 3000,
        }))

        dispatch(userSlice.clearUserState("authSnsResult"));
        return;
      }


      if (loginSheetRef.current)
        loginSheetRef.current.handleClose();

      if (user.free_point + user.paid_point < series.req_point) {
        // if (displayPopName) {
        //   dispatch(
        //     globalSlice.setDisplayPopName(
        //       displayPopType.POPUP_PAYMENT_PRODUCT_LIST.name
        //     )
        //   );
        // }
        
      } 

      dispatch(globalSlice.addToast({
        id: Date.now(),
        message: '로그인 성공',
        duration: 2000,
      }))

      dispatch(userSlice.setUser(user));

      localStorage.setItem("user-id", user.id);

      dispatch(userSlice.clearUserState("authSnsResult"));
      return;
    }
  }, [authSnsResult, authSnsError, displayPopName, isMobile, series]);

  // 북마크 시리즈 리스트 조회 결과
  useEffect(() => {
    if (userSeriesKeepListError) {
      console.log("userSeriesKeepListError ", userSeriesKeepListError);

      dispatch(userSlice.clearUserState("userSeriesKeepListError"));
    }

    if (userSeriesKeepListResult && userSeriesKeepListResult.status === 200) {
      console.log("userSeriesKeepListResult ", userSeriesKeepListResult);

      dispatch(userSlice.setSeriesKeepList(userSeriesKeepListResult.data));

      // 사용자 북마크 확인
      userSeriesKeepListResult.data.forEach((keep: any) => {
        if (keep.id === Number(seriesIdRef.current)) {
          setKeep(true);
          return;
        }
      });

      dispatch(userSlice.clearUserState("userSeriesKeepListResult"));
    }
  }, [userSeriesKeepListResult, userSeriesKeepListError]);

  // 북마크 등록 결과
  useEffect(() => {
    if (addSeriesKeepError) {
      console.log("addSeriesKeepError ", addSeriesKeepError);

      dispatch(userSlice.clearUserState("addSeriesKeepError"));
    }

    if (addSeriesKeepResult && addSeriesKeepResult.status === 201) {
      console.log("addSeriesKeepResult ", addSeriesKeepResult);

      // dispatch(globalSlice.seriesList());
      dispatch(userSlice.userSeriesKeepList({ userId: user.id }));

      dispatch(userSlice.clearUserState("addSeriesKeepResult"));
    }
  }, [addSeriesKeepResult, addSeriesKeepError]);

  // 북마크 삭제 결과
  useEffect(() => {
    if (removeSeriesKeepError) {
      console.log("removeSeriesKeepError ", removeSeriesKeepError);

      dispatch(userSlice.clearUserState("removeSeriesKeepError"));
    }

    if (removeSeriesKeepResult && removeSeriesKeepResult.status === 200) {
      console.log("removeSeriesKeepResult ", removeSeriesKeepResult);

      dispatch(userSlice.userSeriesKeepList({ userId: user.id }));

      dispatch(userSlice.clearUserState("removeSeriesKeepResult"));
    }
  }, [removeSeriesKeepResult, removeSeriesKeepError]);

  // 잠금 회차 업데이트 결과
  useEffect(() => {
    if (updateSeriesUnlockEpisodeError) {
      console.log("updateSeriesUnlockEpisodeError ",updateSeriesUnlockEpisodeError);

      dispatch(userSlice.clearUserState("updateSeriesUnlockEpisodeError"));
    }

    if (updateSeriesUnlockEpisodeResult && updateSeriesUnlockEpisodeResult.status === 200) {
      console.log("updateSeriesUnlockEpisodeResult ",updateSeriesUnlockEpisodeResult);

      if (locked) {
        setLocked(false);
        dispatch(globalSlice.addToast({
          id: Date.now(),
          message: "에피소드가 잠금해제 됐어요.",
          duration: 1500,
        }))
      }

      setUnlockEpisode(updateSeriesUnlockEpisodeResult.data.unlock_episode);
      setLastEpisode(updateSeriesUnlockEpisodeResult.data.last_episode);

      videoRef.current.play();
      setPlaying(true);

      dispatch(userSlice.clearUserState("updateSeriesUnlockEpisodeResult"));
    }
  }, [updateSeriesUnlockEpisodeResult, updateSeriesUnlockEpisodeError, locked]);

  // 진행 상태 추가 결과
  useEffect(() => {
    if (addSeriesProgressError) {
      console.log("addSeriesProgressError ", addSeriesProgressError);

      dispatch(userSlice.clearUserState("addSeriesProgressError"));
    }

    if (addSeriesProgressResult && addSeriesProgressResult.status === 201) {
      console.log("addSeriesProgressResult ", addSeriesProgressResult);

      setLastEpisode(addSeriesProgressResult.data.last_episode);

      if (!keep) {
        sequenceCountRef.current++;
      }

      dispatch(userSlice.clearUserState("addSeriesProgressResult"));
    }
  }, [
    addSeriesProgressResult,
    addSeriesProgressError,
    videoRef.current,
    sequenceCountRef.current,
  ]);

  // 진행 상태 업데이트 결과
  useEffect(() => {
    if (updateSeriesProgressError) {
      console.log("updateSeriesProgressError ", updateSeriesProgressError);

      dispatch(userSlice.clearUserState("updateSeriesProgressError"));
    }

    if (
      updateSeriesProgressResult &&
      updateSeriesProgressResult.status === 200
    ) {
      console.log("updateSeriesProgressResult ", updateSeriesProgressResult);
      setLastEpisode(updateSeriesProgressResult.data.last_episode);

      if (!keep) {
        sequenceCountRef.current++;
      }

      console.log("sequenceCountRef.current ", sequenceCountRef.current);

      // 3회 연속 시청 시 북마크 등록
      if (sequenceCountRef.current === 3 && !keep) {
        dispatch(
          userSlice.addSeriesKeep({
            userId: user.id,
            seriesId: seriesIdRef.current,
          })
        );
        sequenceCountRef.current = 1;
      }

      dispatch(userSlice.clearUserState("updateSeriesProgressResult"));
    }
  }, [
    updateSeriesProgressResult,
    updateSeriesProgressError,
    sequenceCountRef.current,
  ]);

  // 진행 상태 조회 결과
  useEffect(() => {
    if (userSeriesProgressError) {
      console.log("userSeriesProgressError ", userSeriesProgressError);

      dispatch(userSlice.clearUserState("userSeriesProgressError"));
    }

    if (userSeriesProgressResult && userSeriesProgressResult.status === 200) {
      console.log("userSeriesProgressResult ", userSeriesProgressResult);

      // 사용자의 해당 시리즈 진행 상태가 존재하는 경우
      if (userSeriesProgressResult.data?.last_episode) {
        setLastEpisode(userSeriesProgressResult.data.last_episode);
        setUnlockEpisode(userSeriesProgressResult.data.unlock_episode);
        handleEpisodeChange(userSeriesProgressResult.data.last_episode);
      }

      // 패스권 구독중인 사용자인 경우 전체 회차 잠금 해제
      if(subscription?.status === 'active') {
        setUnlockEpisode(episodeList.length);
      }

      // 사용자의 해당 시리즈 진행 상태가 존재하지 않는 경우
      if (userSeriesProgressResult.data?.message === "NO_DATA_FOUND") {
        setLastEpisode(1);
        setUnlockEpisode(series?.free_count);
        dispatch(
          userSlice.addSeriesProgress({
            userId: user?.id,
            seriesId: seriesIdRef.current,
            ep: 1,
            free_ep: series?.free_count,
          })
        );
        handleEpisodeChange(1);
      }

      dispatch(userSlice.clearUserState("userSeriesProgressResult"));
    }
  }, [userSeriesProgressResult, userSeriesProgressError, episodeList, series]);

  // 에피소드 리스트 조회 결과
  useEffect(() => {
    if (episodeListError) {
      console.log("episodeListError ", episodeListError);

      dispatch(globalSlice.clearGlobalState("episodeListError"));
    }

    if (episodeListResult && episodeListResult.status === 200) {
      console.log("episodeListResult ", episodeListResult);
      setEpisodeList(episodeListResult.data);

      dispatch(globalSlice.clearGlobalState("episodeListResult"));
    }
  }, [episodeListResult, episodeListError]);

  // 시리즈 정보 조회 결과
  useEffect(() => {
    if (seriesInfoError) {
      console.log("seriesInfoError ", seriesInfoError);

      dispatch(globalSlice.clearGlobalState("seriesInfoError"));
    }

    if (seriesInfoResult && seriesInfoResult.status === 200) {
      console.log("seriesInfoResult ", seriesInfoResult);
      const series = seriesInfoResult.data;

      setKeepCount(series.keeps);

      // 사용자의 시리즈 진행 상태 조회
      dispatch(
        userSlice.userSeriesProgress({
          userId: user?.id,
          seriesId: seriesIdRef.current,
        })
      );
      dispatch(globalSlice.setSeries(series));

      dispatch(globalSlice.clearGlobalState("seriesInfoResult"));
    }
  }, [seriesInfoResult, seriesInfoError]);

  // 결제 상품 조회 결과
  useEffect(() => {
    if (productListError) {
      console.log("productListError ", productListError);

      dispatch(globalSlice.clearGlobalState("productListError"));
    }

    if(productListResult && productListResult.status === 200) {
      console.log("productListResult ", productListResult);
      const productList = productListResult.data;

      dispatch(globalSlice.setProductList(productList));

      dispatch(globalSlice.clearGlobalState("productListResult"));
    }
  }, [productListResult, productListError])

  // 비디오 URL -> blob URL 변환
  // useEffect(() => {
  //   const loadVideoBlobUrl = async () => {
  //     try {
  //       console.log('loadVideoBlobUrl start');
  //       setVideoLoading(true);

  //       const blobUrl: any = await convertToBlobURL(
  //         `${import.meta.env.VITE_SERVER_URL}/videos/${currentEp?.series_id}/${
  //           currentEp?.video
  //         }`
  //       );

  //       if (blobUrl) {
  //         blobUrlRef.current = blobUrl;
  //       }
  //     } catch (error) {
  //       console.log('loadVideoBlobUrl error')
  //       console.error("Error converting video to blob URL:", error);
  //     } finally {
  //       console.log('loadVideoBlobUrl finally');
  //       setVideoLoading(false);
  //     }
  //   };

  //   if (currentEp) {
  //     if(currentEp.thumbnail_img) {
  //       videoRef.current.poster = `${import.meta.env.VITE_SERVER_URL}/resources/images/thumbnail/${series?.id}/${currentEp.thumbnail_img}`
  //     }

  //     loadVideoBlobUrl();
  //   }

  //   return () => {
  //     if (abortControllerRef.current) {
  //       abortControllerRef.current.abort();
  //     }
  //     clearBlobUrlCache();
  //   };
  // }, [currentEp, locked]);

  // 현재 에피소드
  useEffect(() => {
    if (episodeList[0] && lastEpisode) {
      setCurrentEp(episodeList[lastEpisode - 1]);
    }
  }, [episodeList, lastEpisode]);

  // 에피소드 변경될때 잠긴 에피소드인 경우 재생 중지
  useEffect(() => {
    if (unlockEpisode && currentEp?.episode_num > unlockEpisode) {
      videoRef.current.play();
      setLocked(true);
      setPlaying(false);
      videoRef.current.pause();
    } else {
      setLocked(false);
    }
  }, [currentEp, unlockEpisode]);

  useEffect(() => {
    if (videoRef.current && lastEpisode && unlockEpisode && series) {
      setLoading(false);
    }
  }, [videoRef.current, lastEpisode, unlockEpisode, series]);

  // useEffect(() => {
  //   if (blobUrlRef.current) {
  //     if (!locked) {
  //       setPlaying(true);
  //       videoRef.current.play();
  //     } else {
  //       setPlaying(false);
  //       videoRef.current.pause();
  //     }
  //   }
  // }, [blobUrlRef.current, locked]);

  useEffect(() => {
    console.log("window", window.location);
    // 최상단 스크롤
    window.scrollTo(0, 0);

    // 시리즈 정보 조회
    dispatch(globalSlice.seriesInfo({ seriesId: seriesIdRef.current }));

    // 시리즈의 전체 에피소드 리스트 조회
    dispatch(globalSlice.episodeList({ seriesId: seriesIdRef.current }));

    // 시리즈 조회수 증가
    dispatch(globalSlice.increaseSeriesView({ seriesId: seriesIdRef.current }));

    // 사용자 북마크 리스트 조회
    dispatch(userSlice.userSeriesKeepList({ userId: user.id }));

    // 결제 상품 조회
    dispatch(globalSlice.productList({}));

    // 전체화면 이벤트 등록
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div className={'beta-main-wrap'}>
        <div className={"player-wrap"}>
          <div className="short-form-swiper">
            <UIShortFormSwiper
              quality={quality}
              series={series}
              locked={locked}
              playing={playing}
              muted={muted}
              hlsRef={hlsRef}
              swiperRef={swiperRef}
              blobUrlRef={blobUrlRef}
              currentTimeRef={currentTimeRef}
              setVideoLoading={setVideoLoading}
              setPlaying={setPlaying}
              handleSlideChange={handleSlideChange}
              handleSlideChangeStart={handleSlideChangeStart}
              handleVideoEnded={handleVideoEnded}
              episodeList={episodeList}
              videoRef={videoRef}
              handleTimeUpdate={handleTimeUpdate}
              toggleTools={toggleTools}
              unlockEpisode={unlockEpisode}
              lastEpisode={lastEpisode}
              handleEpisodeChange={handleEpisodeChange}
            />
            {videoLoading && (
              <div className="loading">
                <TailSpin width={60} height={60} color={"#ffffff"} />
              </div>
            )}
          </div>
          {loading && (
            <div className="loading">
              <TailSpin width={60} height={60} color={"#ffffff"} />
            </div>
          )}
          {isMobile && (
            <div className="header">
            <div className="left-section">
              <img
                src={`/resources/icons/icon_hamburger.svg`}
                onClick={handleMenuOpen}
              />
              <Link to={window.location.origin} className="title">
                <img className='logo' src={"/resources/images/main_logo_white.svg"}/>
              </Link>
            </div>
            <div className="right-section">
              <Link to="/profile">
                <img
                  className="profile-icon"
                  src={`/resources/icons/icon_profile.svg`}
                />
              </Link>
            </div>
          </div>
          )}
          {visibleTools && (
            <>
             <div className="beta-player-header" style={{ background: "none" }}>
                <div className="left-section">
                  <span className="title">
                    {`${series?.title} ${currentEp?.episode_num ? `[${currentEp.episode_num}]` : ""}`}
                  </span>
                </div>
                <div className="right-section">
                  <img className="speaker-icon" src={`/resources/icons/${muted ? "icon_speaker_muted_l.svg" : "icon_speaker_l.svg"}`} onClick={handleMuted}/>
                  <img className="kebab-icon" src={`/resources/icons/icon_kebab.svg`} onClick={handleOptionOpen}/>
                </div>
              </div>
              {!locked && !loading && !videoLoading && (
                <>
                  {playing && (
                    <img
                      className="main-play-btn"
                      src="/resources/icons/icon_pause_main.svg"
                      onClick={togglePlay}
                    />
                  )}
                  {!playing && (
                    <img
                      className="main-play-btn"
                      src="/resources/icons/icon_play_main.svg"
                      onClick={togglePlay}
                    />
                  )}
                </>
              )}
              <div className="right-menu">
                <div className="btn-wrap" onClick={handleSeriesKeep}>
                  <img id="bookmark-btn" src={`/resources/icons/icon_bookmark${keep ? "_fill" : ""}.svg`}/>
                  {keepCount}
                </div>
                <div className="btn-wrap" onClick={handleBottomSheetOpen}>
                  <img id="list-btn" src="/resources/icons/icon_list.svg" />
                  List
                </div>
              </div>
              {!locked && (
                <div className="progress-bar">
                  <input
                    style={{
                      background: `linear-gradient(to right, #1A6EFF ${progress}%, #535353 ${progress}%)`,
                    }}
                    type="range"
                    min="0"
                    max="100"
                    step="0.1"
                    value={progress}
                    onChange={handleProgressChange}
                    onTouchEnd={handleProgressTouchEnd}
                    onTouchStart={handleProgressTouchStart}
                  />
                </div>
              )}
            </>
          )}
          {locked && (
            <UILayerLockedEpisode
              handlePointUse={handlePointUse}
              handleLockedClose={handleLockedClose}
              handlePaymentComplete={handlePaymentComplete}
              handleLoginOpen={handleLoginOpen}
            />
				)}
        <>
          { user.auth === 'guest' && (
            <UIBottomSheetLogin
            ref={loginSheetRef}
            visible={visibleBottomSheetLogin}
            signInProcess={signInProcess}
            handleLoginBottomSheetClose={handleLoginClose}
          />)}
          <UIBottomSheetEpisodeGrid
            series={series}
            locked={locked}
            setLocked={setLocked}
            currentEp={currentEp}
            unlockEpisode={unlockEpisode}
            visibleBottomSheet={visibleBottomSheetEpisode}
            handleBottomSheetClose={handleBottomSheetClose}
            handleEpisodeChange={handleEpisodeChange}
            handleEpisodeLock={handleEpisodeLock}
          />
          <UIBottomSheetVideoOption
            ref={optionSheetRef}
            visible={visibleBottomSheetOption}
            handleBottomSheetClose={handleOptionClose}
            handleQualityOpen={handleQualityOpen}
            handleSpeedOpen={handleSpeedOpen}
          />
          <UIBottomSheetQuality
            ref={qualitySheetRef}
            visible={visibleBottomSheetQuality}
            quality={quality}
            handleBottomSheetClose={handleQualityClose}
            handleQualityChange={handleQualityChange}
          />
          <UIBottomSheetSpeed
            ref={speedSheetRef}
            visible={visibleBottomSheetSpeed}
            speed={speed}
            handleBottomSheetClose={handleSpeedClose}
            handleSpeedChange={handleSpeedChange}
          />
        </>
        </div>
      {displayPopName === displayPopType.POPUP_PAYMENT_PRODUCT_LIST.name && (
        <UIPopPaymentProductList
          setPaymentLoading={setPaymentLoading}
          handlePaymentComplete={handlePaymentComplete}
        />
      )}
      {/* Beta {paymentProduct && !isMobile && (
        <TossPayment handlePaymentComplete={handlePaymentComplete} />
      )} */}
      {displayPopName === displayPopType.POPUP_LOGIN.name && (
        <UIPopLogin signInProcess={signInProcess} />
      )}
      {paymentLoading && (
        <UILayerSpinner/>
      )}
     {isMobile &&  <UILeftMenu visible={visibleMenu} handleMenuClose={handleMenuClose} />}
    </div>
  );
};

export default BetaMainPage;
