import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import UIMainContentItem from './UIMainContentItem';

interface Props {
  contentList: any[];
  handleSeriesPlayerOpen: (series: any) => any;
}

const UIMainContentSlider = ({contentList, handleSeriesPlayerOpen}: Props) => {

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
      items: 1,
      partialVisibilityGutter: 40
    }
  };

  return (
    <Carousel
      arrows={false}
      partialVisible={true}
      swipeable={true}
      draggable={true}
      showDots={false}
      responsive={responsive}
      infinite={true}
      keyBoardControl={true}
      autoPlay={false}
      >
      {contentList.map((i: any, index: number) => <UIMainContentItem item={i} key={index} handleSeriesPlayerOpen={handleSeriesPlayerOpen}/>)}
    </Carousel>
  )
}

export default UIMainContentSlider;

