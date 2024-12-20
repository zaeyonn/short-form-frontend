import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { displayPopType, uiPopType } from 'common/define';

import * as globalSlice from 'src/redux/globalSlice';
import * as userSlice from 'src/redux/userSlice';

import UIMainContentSlider from "components/ui/UIMainContentSlider"
import UISmallContentSlider from "components/ui/UISmallContentSlider"
import UIVerticalContentList from "components/ui/UIVerticalContentList"
import UIPopShortFormPlayer from "components/ui/popup/UIPopShortFormPlayer"
import UIPopMyProfile from 'components/ui/popup/UIPopMyProfilePage';
import UIPopLogin from 'components/ui/popup/UIPopLogin';
import UIPopPurchasePoint from 'components/ui/popup/UIPopPurchasePoint';
import UIPopSeriesKeeped from 'components/ui/popup/UIPopSeriesKeeped';
import UIPopSeriesWatched from 'components/ui/popup/UIPopSeriesWatched';
import UILeftMenu from 'components/ui/UILeftMenu';

const MainPage = () => {
  const dispatch = useDispatch();

  const { displayPopName, uiPopName, seriesListResult, seriesListError, selectedSeries, isLogin } = useSelector((state: any) => state.global)
  const { addSeriesKeepResult, addSeriesKeepError, seriesKeepList } = useSelector((state: any) => state.user);

  const [seriesList, setSeriesList] = useState([]);

  const handleShortFormOpen = (series: any) => {
    dispatch(globalSlice.setDisplayPopName(displayPopType.POPUP_SHORT_FORM_PLAYER.name));
    dispatch(globalSlice.setSelectedSeries(series));
  }

  // 시리즈 북마크 결과
  useEffect(() => {
    if(addSeriesKeepError) {
      console.log('addSeriesKeepError ', addSeriesKeepError);

      dispatch(userSlice.clearUserState('addSeriesKeepError'));
    }

    if(addSeriesKeepResult && addSeriesKeepResult.data.code === 201) {
      console.log('addSeriesKeepResult ', addSeriesKeepResult);
      
      dispatch(userSlice.setSeriesKeepList([...seriesKeepList, selectedSeries]))

      dispatch(userSlice.clearUserState('addSeriesKeepResult'));
    }
  }, [addSeriesKeepResult, addSeriesKeepError]);

  // 시리즈 리스트 조회 결과
  useEffect(() => {
    if(seriesListError) {
      console.log('seriesListError ', seriesListError);

      dispatch(globalSlice.clearGlobalState('seriesListError'));
    }

    if(seriesListResult && seriesListResult.data.code === 200) {
      console.log('seriesListResult ', seriesListResult);

      setSeriesList(seriesListResult.data.data);
      dispatch(globalSlice.clearGlobalState('seriesListResult'));
    }
  }, [seriesListResult, seriesListError]);

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
        <UIMainContentSlider
          contentList={seriesList.slice(0, 3)}
          handleShortFormOpen={handleShortFormOpen}/>
        <UISmallContentSlider
          headerTitle='지금 뜨고있는 TOP 10'
          contentList={seriesList}
          highlight='HOT'
          handleShortFormOpen={handleShortFormOpen}/>
        <UISmallContentSlider
          headerTitle='새로 올라온 콘텐츠'
          contentList={seriesList}
          highlight='NEW'
          handleShortFormOpen={handleShortFormOpen}/>
        <UISmallContentSlider
          headerTitle='비밀을 가진 사람들'
          contentList={seriesList}
          highlight=''
          handleShortFormOpen={handleShortFormOpen}/>
        <UIVerticalContentList
          headerTitle='요즘 뜨는 환생 드라마'
          contentList={seriesList}
          handleShortFormOpen={handleShortFormOpen}/>
      </div>

      { displayPopName === displayPopType.POPUP_SHORT_FORM_PLAYER.name && (<UIPopShortFormPlayer/>)}
      { displayPopName === displayPopType.POPUP_MYPROFILE.name && (<UIPopMyProfile/>)}
      { displayPopName === displayPopType.POPUP_LOGIN.name && (<UIPopLogin/>)}
      { displayPopName === displayPopType.POPUP_PURCHASE_POINT.name && (<UIPopPurchasePoint/>)}
      { displayPopName === displayPopType.POPUP_VIDEO_KEEP.name && (<UIPopSeriesKeeped/>)}
      { displayPopName === displayPopType.POPUP_VIDEO_WATCH.name && (<UIPopSeriesWatched/>)}

      { uiPopName ===  uiPopType.UI_LEFT_MENU.name && (<UILeftMenu/>)}
    </>
  )
}

export default MainPage