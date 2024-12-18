import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { displayPopType } from 'common/define';

import * as globalSlice from 'src/redux/globalSlice';

import UIMainContentSlider from "components/ui/UIMainContentSlider"
import UISmallContentSlider from "components/ui/UISmallContentSlider"
import UIVerticalContentList from "components/ui/UIVerticalContentList"
import UIPopShortFormPlayer from "components/ui/popup/UIPopShortFormPlayer"
import UIPopMyProfile from 'components/ui/popup/UIPopMyProfilePage';
import UIPopLogin from 'components/ui/popup/UIPopLogin';
import UIPopPurchasePoint from 'components/ui/popup/UIPopPurchasePoint';
import UIPopVideoWatched from 'components/ui/popup/UIPopVideoWatched';

const MainPage = () => {
  const dispatch = useDispatch();
  const { displayPopName, isLogin } = useSelector((state: any) => state.global);

  const contentList = [
    {
      title: '김비서가 왜그럴까',
      sub: '김비서가 왜그럴까 설명 설명 설명',
      url: 'resources/images/main_poster_1.png'
    },
    {
      title: '사랑은 외나무다리에서',
      sub: '사랑은 외나무다리에서 설명 설명 설명',
      url: 'resources/images/main_poster_2.png'
    },
    {
      title: '차곡 차곡 사랑하고 있습니다',
      sub: '차곡 차곡 사랑하고 있습니다. ㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
      url: 'resources/images/main_poster_3.png'
    }
  ]

  const hotContentList = [
    {
      title: '차곡 차곡 사랑하고 있습니다.',
      keyword: ['키워드1', '키워드2', '키워드3', '키워드4'],
      highlight: 'HOT',
      url: 'resources/images/main_poster_3.png'
    },
    {
      title: '삼각 로맨스',
      keyword: ['키워드1', '키워드2', '키워드3', '키워드4'],
      highlight: 'HOT',
      url: 'resources/images/poster_4.png'
    },
    {
      title: '취하는 로맨스',
      keyword: ['키워드1', '키워드2', '키워드3', '키워드4'],
      highlight: 'HOT',
      url: 'resources/images/poster_5.png'
    },
    {
      title: '취하는 로맨스',
      keyword: ['키워드1', '키워드2', '키워드3', '키워드4'],
      highlight: 'HOT',
      url: 'resources/images/poster_5.png'
    },
    {
      title: '취하는 로맨스',
      keyword: ['키워드1', '키워드2', '키워드3', '키워드4'],
      highlight: 'HOT',
      url: 'resources/images/poster_5.png'
    },
    {
      title: '취하는 로맨스',
      keyword: ['키워드1', '키워드2', '키워드3', '키워드4'],
      highlight: 'HOT',
      url: 'resources/images/poster_5.png'
    },
    {
      title: '취하는 로맨스',
      keyword: ['키워드1', '키워드2', '키워드3', '키워드4'],
      highlight: 'HOT',
      url: 'resources/images/poster_5.png'
    },
    {
      title: '취하는 로맨스',
      keyword: ['키워드1', '키워드2', '키워드3', '키워드4'],
      highlight: 'HOT',
      url: 'resources/images/poster_5.png'
    },
    {
      title: '취하는 로맨스',
      keyword: ['키워드1', '키워드2', '키워드3', '키워드4'],
      highlight: 'HOT',
      url: 'resources/images/poster_5.png'
    },
    {
      title: '취하는 로맨스',
      keyword: ['키워드1', '키워드2', '키워드3', '키워드4'],
      highlight: 'HOT',
      url: 'resources/images/poster_5.png'
    },
  ]

  const verticalContentList = [
    {
      title: '대표님과의 비밀 결혼',
      keyword: ['환생', '연애', '시리즈'],
      url: 'resources/images/poster_6.jpg',
      description: '3줄 이하로 작성해주세요. 핵심 정보를 간결하고 명확하게 전달하는 것이 중요합니다.',
      full_ep: 30,
      cur_ep: 15,
    },
    {
      title: '가난한 사위는 회장님',
      keyword: ['환생', '성장물', '시리즈'],
      url: 'resources/images/poster_7.png',
      description: '3줄 이하로 작성해주세요. 핵심 정보를 간결하고 명확하게 전달하는 것이 중요합니다.',
      full_ep: 20,
      cur_ep: 5,
    },
    {
      title: '사랑받는 엄마는 못말려',
      keyword: ['환생', '피폐물', '시리즈'],
      url: 'resources/images/poster_8.jpg',
      description: '3줄 이하로 작성해주세요. 핵심 정보를 간결하고 명확하게 전달하는 것이 중요합니다.',
      full_ep: 500,
      cur_ep: 100,
    },
    {
      title: '잃어버린 상속자',
      keyword: ['환생생', '반전전', '시리즈'],
      url: 'resources/images/poster_9.jpg',
      description: '3줄 이하로 작성해주세요. 핵심 정보를 간결하고 명확하게 전달하는 것이 중요합니다.',
      full_ep: 40,
      cur_ep: 20,
    },
  ]

  const handleShortFormOpen = () => {
    dispatch(globalSlice.setDisplayPopName(displayPopType.POPUP_SHORT_FORM_PLAYER.name));
  }

  return (
    <>
      {(displayPopName === '') && (      
        <div className='page-wrap' style={{height: displayPopName ? 500 : 'auto'}}>
          <div className='header'>
            <div className="left-section">
              <img src={`resources/icons/icon_arrow_left_m.svg`}/>
              <span className="title">Logo</span>
            </div>
      
            <div className='right-section'>
              <button onClick={() => {dispatch(globalSlice.setDisplayPopName(displayPopType.POPUP_MYPROFILE.name))}}>{isLogin ? ' 로그아웃' : '로그인'}</button>
            </div>
          </div>

          <UIMainContentSlider
            contentList={contentList}
            handleShortFormOpen={handleShortFormOpen}/>
          <UISmallContentSlider
            headerTitle='지금 뜨고있는 TOP 10'
            contentList={hotContentList}
            highlight='HOT'/>
          <UISmallContentSlider
            headerTitle='새로 올라온 콘텐츠'
            contentList={hotContentList}
            highlight='NEW'/>
          <UISmallContentSlider
            headerTitle='비밀을 가진 사람들'
            contentList={hotContentList}
            highlight=''/>
          <UIVerticalContentList
            headerTitle='요즘 뜨는 환생 드라마'
            contentList={verticalContentList}/>
        </div>
      )}

      { displayPopName === displayPopType.POPUP_SHORT_FORM_PLAYER.name && (<UIPopShortFormPlayer/>)}
      { displayPopName === displayPopType.POPUP_MYPROFILE.name && (<UIPopMyProfile/>)}
      { displayPopName === displayPopType.POPUP_LOGIN.name && (<UIPopLogin/>)}
      { displayPopName === displayPopType.POPUP_PURCHASE_POINT.name && (<UIPopPurchasePoint/>)}
      { displayPopName === displayPopType.POPUP_VIDEO_WATCH.name && (<UIPopVideoWatched/>)}
    </>
  )
}

export default MainPage