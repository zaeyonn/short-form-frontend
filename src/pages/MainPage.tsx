import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import * as globalSlice from 'src/redux/globalSlice';
import * as userSlice from 'src/redux/userSlice';

import UIMainContentSlider from "components/ui/UIMainContentSlider"
import UIDesktopMainContentSlider from 'components/ui/desktop/UIDesktopMainContentSlider';
import UISmallContentSlider from "components/ui/UISmallContentSlider"
import UIVerticalContentList from "components/ui/UIVerticalContentList"
import UILeftMenu from 'components/ui/UILeftMenu';

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { seriesList, displayPopName, seriesListResult, seriesListError, seriesPlayer, isMobile } = useSelector((state: any) => state.global)
  const { user, addSeriesKeepResult, addSeriesKeepError ,userSeriesKeepListResult, userSeriesKeepListError, removeSeriesKeepResult, removeSeriesKeepError } = useSelector((state: any) => state.user);

  const [visibleMenu, setVisibleMenu] = useState(false);
  
  const handleMenuOpen = () => {
    setVisibleMenu(true);
  }

  const handleMenuClose = () => {
    setVisibleMenu(false);
  }

  const handleSeriesListOpen = (title: string) => {
    navigate('/series-list');
    dispatch(globalSlice.setSeriesListTitle(title));
  }

  // 북마크 등록 결과
  useEffect(() => {
    if(addSeriesKeepError) {
      console.log('addSeriesKeepError ', addSeriesKeepError);

      dispatch(userSlice.clearUserState('addSeriesKeepError'));
    }

    if(addSeriesKeepResult && addSeriesKeepResult.data.code === 201) {
      console.log('addSeriesKeepResult ', addSeriesKeepResult);
      
      dispatch(globalSlice.seriesList());
      dispatch(userSlice.userSeriesKeepList({ userId: user.id }));

      dispatch(userSlice.clearUserState('addSeriesKeepResult'));
    }
  }, [addSeriesKeepResult, addSeriesKeepError]);

  // 북마크 삭제 결과
  useEffect(() => {
    if(removeSeriesKeepError) {
      console.log('removeSeriesKeepError ', removeSeriesKeepError);

      dispatch(userSlice.clearUserState('removeSeriesKeepError'));
    }

    if(removeSeriesKeepResult && removeSeriesKeepResult.data.code === 201) {
      console.log('removeSeriesKeepResult ', removeSeriesKeepResult);
      
      dispatch(userSlice.userSeriesKeepList({ userId: user.id }));
      dispatch(globalSlice.seriesList());

      dispatch(userSlice.clearUserState('removeSeriesKeepResult'));
    }
  }, [removeSeriesKeepResult, removeSeriesKeepError]);

  // 북마크 시리즈 리스트 조회 결과
  useEffect(() => {
    if(userSeriesKeepListError) {
      console.log('userSeriesKeepListError ', userSeriesKeepListError);

      dispatch(userSlice.clearUserState('userSeriesKeepListError'));
    }

    if(userSeriesKeepListResult && userSeriesKeepListResult.data.code === 200) {
      console.log('userSeriesKeepListResult ', userSeriesKeepListResult);
    
      dispatch(userSlice.setSeriesKeepList(userSeriesKeepListResult.data.data));

      dispatch(userSlice.clearUserState('userSeriesKeepListResult'));
    }
  }, [userSeriesKeepListResult, userSeriesKeepListError]);

  // 시리즈 리스트 조회 결과
  useEffect(() => {
    if(seriesListError) {
      dispatch(globalSlice.clearGlobalState('seriesListError'));
    }

    if(seriesListResult && seriesListResult.status === 200) {
      dispatch(globalSlice.setSeriesList(seriesListResult.data));
      dispatch(globalSlice.clearGlobalState('seriesListResult'));
    }
  }, [seriesListResult, seriesListError]);

  // 메뉴 활성화시 스크롤 막음
  useEffect(() => {
    if(visibleMenu || displayPopName !== '' || seriesPlayer) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [visibleMenu, displayPopName, seriesPlayer])

  // 사용자 정보가 있을 경우 북마크 리스트 조회
  useEffect(() => {
    if(user) {
      dispatch(userSlice.userSeriesKeepList({userId: user.id}));
    }
  }, [user])

  // 시리즈 리스트 조회
  useEffect(() => {
    dispatch(globalSlice.seriesList());
  }, [])

  return (
    <>
      <div className='page-wrap'>
        <div className='header'>
          <div className="left-section">
            <img src={`/resources/icons/icon_hamburger.svg`} onClick={handleMenuOpen}/>
            <span className="title">Short Form</span>
          </div>
          <div className='right-section'>
            <Link to='/profile'>
              <img className='profile-icon' src={`/resources/icons/icon_profile.svg`}/>
            </Link>
          </div>
        </div>
        { isMobile ? (
          <UIMainContentSlider
            seriesList={seriesList.slice(0, 3)}/>
        ) : (
          <UIDesktopMainContentSlider
            seriesList={seriesList.slice(0, 3)}/>
        )}
        <UISmallContentSlider
          headerTitle='지금 뜨고있는 TOP 10'
          seriesList={seriesList}
          highlight='HOT'
          handleSeriesListOpen={handleSeriesListOpen}/>
        <UISmallContentSlider
          headerTitle='새로 올라온 콘텐츠'
          seriesList={seriesList}
          highlight='NEW'
          handleSeriesListOpen={handleSeriesListOpen}/>
        <UISmallContentSlider
          headerTitle='비밀을 가진 사람들'
          seriesList={seriesList}
          highlight=''
          handleSeriesListOpen={handleSeriesListOpen}/>
        <UIVerticalContentList
          headerTitle='요즘 뜨는 환생 드라마'
          seriesList={seriesList}
          handleSeriesListOpen={handleSeriesListOpen}/>
      </div>
      <UILeftMenu
      visible={visibleMenu}
      handleMenuClose={handleMenuClose}
      />
    </>
  )
}

export default MainPage