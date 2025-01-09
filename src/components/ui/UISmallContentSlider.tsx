import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import * as globalSlice from 'src/redux/globalSlice';
import UISmallContentItem from './UISmallContentItem';
import { useDispatch, useSelector } from 'react-redux';
import { displayPopType } from 'common/define';

interface Props {
  contentList: any[];
  headerTitle?: string;
  highlight: string;
  handleShortFormOpen: (series: any) => any;
}

const UISmallContentSlider = ({contentList, headerTitle, highlight, handleShortFormOpen}: Props) => {
  const { displayPopName } = useSelector((state: any) => state.global);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      partialVisibilityGutter: 40
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 40
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      
      partialVisibilityGutter: 40
    },
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 3,
    }
  };

  return (
    <div className='small-content-slider-wrap'>
      { headerTitle && (
        <div className='header'>
          { headerTitle }
          <img src='resources/icons/icon_arrow_right_s.svg' alt='icon-arrow-right'/>
        </div>
      )}
      <div className='small-content-list'>
        { contentList.map((i: any, index: number) => <UISmallContentItem item={i} key={index} highlight={highlight} handleShortFormOpen={handleShortFormOpen}/>) }

        {(displayPopName === displayPopType.POPUP_MYPROFILE.name) && (0 < contentList.length) && (
          <button className='more' onClick={() => {dispatch(globalSlice.setDisplayPopName(displayPopType.POPUP_VIDEO_WATCH.name))}}>더보기</button>
        )}
      </div>
    </div>
  )
}

export default UISmallContentSlider;