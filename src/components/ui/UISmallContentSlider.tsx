import UISmallContentItem from './UISmallContentItem';

interface Props {
  contentList: any[];
  headerTitle?: string;
  highlight: string;
  handleSeriesListOpen?: (title: string, seriesList: any[]) => any;
}

const UISmallContentSlider = ({contentList, headerTitle, highlight, handleSeriesListOpen}: Props) => {
  return (
    <div className='small-content-slider-wrap'>
      { headerTitle && (
        <div className='header' onClick={() => handleSeriesListOpen ? handleSeriesListOpen(headerTitle, contentList) : ''}>
          { headerTitle }
          <img src='resources/icons/icon_arrow_right_s.svg' alt='icon-arrow-right'/>
        </div>
      )}
      <div className='small-content-list'>
        { contentList.map((i: any, index: number) => <UISmallContentItem item={i} key={index} highlight={highlight}/>) }
      </div>
    </div>
  )
}

export default UISmallContentSlider;