import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { displayPopType, uiPopType } from 'common/define';
import { Series } from 'src/types/index';

import * as globalSlice from 'src/redux/globalSlice';
import * as userSlice from 'src/redux/userSlice';

import UIMainContentSlider from "components/ui/UIMainContentSlider"
import UISmallContentSlider from "components/ui/UISmallContentSlider"
import UIVerticalContentList from "components/ui/UIVerticalContentList"
import UIPopSeriesPlayer from "components/ui/popup/UIPopSeriesPlayer"
import UIPopMyProfile from 'components/ui/popup/UIPopMyProfilePage';
import UIPopSeriesKeep from 'components/ui/popup/UIPopSeriesKeep';
import UILeftMenu from 'components/ui/UILeftMenu';
import UIPopSignUp from 'components/ui/popup/UIPopSignUp';
import UIPopSeriesList from 'components/ui/popup/UIPopSeriesList';

const MainPage = () => {
  const dispatch = useDispatch();

  const { displayPopName, seriesListResult, seriesListError, seriesPlayer } = useSelector((state: any) => state.global)
  const { user, addSeriesKeepResult, addSeriesKeepError ,userSeriesKeepListResult, userSeriesKeepListError, removeSeriesKeepResult, removeSeriesKeepError } = useSelector((state: any) => state.user);

  const [seriesList, setSeriesList] = useState([]);

  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedSeriesList, setSelectedSeriesList] = useState<Series[]>([]);

  const [visibleMenu, setVisibleMenu] = useState(false);

  const handleMenuOpen = () => {
    setVisibleMenu(true);
  }

  const handleMenuClose = () => {
    setVisibleMenu(false);
  }

  const handleSeriesPlayerOpen = (series: Series) => {
    window.scrollTo(0, 0);
    dispatch(globalSlice.setSeriesPlayer(true));
    dispatch(globalSlice.setSelectedSeries(series));
  }

  const handleProfileClick = () => {
    dispatch(globalSlice.setDisplayPopName(displayPopType.POPUP_MYPROFILE.name));
  }

  const handleSeriesListOpen = (title: string, seriesList: Series []) => {
    dispatch(globalSlice.setDisplayPopName(displayPopType.POPUP_SERIES_LIST.name));
    setSelectedTitle(title);
    setSelectedSeriesList(seriesList);
  }

  // 북마크 등록 결과
  useEffect(() => {
    if(addSeriesKeepError) {
      console.log('addSeriesKeepError ', addSeriesKeepError);

      dispatch(userSlice.clearUserState('addSeriesKeepError'));
    }

    if(addSeriesKeepResult && addSeriesKeepResult.data.code === 201) {
      console.log('addSeriesKeepResult ', addSeriesKeepResult);
      
      // dispatch(userSlice.setSeriesKeepList([...seriesKeepList, {series_id: selectedSeries.id, user_id: user.id}]));
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
      
      //dispatch(userSlice.setSeriesKeepList(seriesKeepList.filter((i: any) => i.id !== removeSeriesKeepResult.data.data.series_id)));
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

      dispatch(globalSlice.clearGlobalState('seriesListResult'));
    }
  }, [userSeriesKeepListResult, userSeriesKeepListError]);

  // 시리즈 리스트 조회 결과
  useEffect(() => {
    if(seriesListError) {

      dispatch(globalSlice.clearGlobalState('seriesListError'));
    }

    if(seriesListResult && seriesListResult.data.code === 200) {
      console.log('seriesListResult : ', seriesListResult);
      setSeriesList(seriesListResult.data.data);
      dispatch(globalSlice.clearGlobalState('seriesListResult'));
    }
  }, [seriesListResult, seriesListError]);

  // 메뉴 활성화시 스크롤 막음
  useEffect(() => {
    if(visibleMenu || displayPopName !== '' || seriesPlayer) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
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

  // 메인화면 네비바 조정
  useEffect(() => {
    const navBar = {
      visible: true, 
      title: 'Logo', 
      leftBtn: {
        icon: 'icon_hamburger.svg', 
        event: () => { 
          dispatch(globalSlice.setUiPopName(uiPopType.UI_LEFT_MENU.name));
        }
      }, 
      
      rightBtn: {
        icon: 'icon_search.svg', 
        event: () => 0
      }
    }
    dispatch(globalSlice.setNavigationBar(navBar));
  }, [])

  return (
    <>
      <div className='page-wrap' style={{height: displayPopName ? 500 : 'auto'}}>
        <div className='nav-bar' style={{visibility : displayPopName ? 'hidden' : 'visible'}}>
          <div className="left-section">
            <img src={`resources/icons/icon_hamburger.svg`} onClick={handleMenuOpen}/>
            <span className="title">Logo</span>
          </div>
          <div className='right-section'>
            <img className='profile-icon' src={`resources/icons/icon_profile.svg`} onClick={handleProfileClick}/>
          </div>
        </div>
        <UIMainContentSlider
          contentList={seriesList.slice(0, 3)}
          handleSeriesPlayerOpen={handleSeriesPlayerOpen}/>
        <UISmallContentSlider
          headerTitle='지금 뜨고있는 TOP 10'
          contentList={seriesList}
          highlight='HOT'
          handleSeriesListOpen={handleSeriesListOpen}/>
        <UISmallContentSlider
          headerTitle='새로 올라온 콘텐츠'
          contentList={seriesList}
          highlight='NEW'
          handleSeriesListOpen={handleSeriesListOpen}/>
        <UISmallContentSlider
          headerTitle='비밀을 가진 사람들'
          contentList={seriesList}
          highlight=''
          handleSeriesListOpen={handleSeriesListOpen}/>
        <UIVerticalContentList
          headerTitle='요즘 뜨는 환생 드라마'
          contentList={seriesList}
          handleSeriesPlayerOpen={handleSeriesPlayerOpen}
          handleSeriesListOpen={handleSeriesListOpen}/>
      </div>
      <UILeftMenu
      visible={visibleMenu}
      handleMenuClose={handleMenuClose}
      />
      { displayPopName === displayPopType.POPUP_SHORT_FORM_PLAYER.name && (<UIPopSeriesPlayer/>)}
      { displayPopName === displayPopType.POPUP_SERIES_LIST.name && (<UIPopSeriesList title={selectedTitle} seriesList={selectedSeriesList}/>)}
      { displayPopName === displayPopType.POPUP_MYPROFILE.name && (<UIPopMyProfile/>)}
      { displayPopName === displayPopType.POPUP_SERIES_KEEP.name && (<UIPopSeriesKeep/>)}
      { displayPopName === displayPopType.POPUP_SIGN_UP.name && (<UIPopSignUp/>)}

      { seriesPlayer && (<UIPopSeriesPlayer/>)}
    </>
  )
}

export default MainPage