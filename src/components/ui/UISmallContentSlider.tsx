import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import UISmallContentItem from './UISmallContentItem';

interface Props {
  contentList: any[];
  headerTitle: string;
  highlight: string;
}

const UISmallContentSlider = ({contentList, headerTitle, highlight}: Props) => {
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
      <div className='header'>
        { headerTitle }
        <img src='resources/icons/icon_arrow_right_s.svg' alt='icon-arrow-right'/>
      </div>
      <div className='small-content-list'>
      { contentList.map((i: any, index: number) => <UISmallContentItem item={i} key={index} highlight={highlight}/>) }
      </div>
    </div>
  )
}

export default UISmallContentSlider;