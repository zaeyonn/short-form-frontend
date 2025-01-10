import UIVerticalContentItem from "./UIVerticalContentItem";

interface Props {
  contentList: any[];
  headerTitle: string;
  handleSeriesPlayerOpen: (series: any) => any;
  handleSeriesListOpen: (title: string, seriesList: any[]) => any;

}

const UIVerticalContentList = ({contentList, headerTitle, handleSeriesPlayerOpen, handleSeriesListOpen}: Props) => {
  return (
    <div className='vertical-content-list-wrap'>
      <div className='header' onClick={() => handleSeriesListOpen(headerTitle, contentList)}>
        { headerTitle }
        <img src='resources/icons/icon_arrow_right_s.svg' alt='icon-arrow-right'/>
      </div>
      <div className='vertical-content-list'>
        {contentList.map((i: any, index: number) => <UIVerticalContentItem item={i} key={index} handleSeriesPlayerOpen={handleSeriesPlayerOpen}/>)}
      </div>
    </div>
  )
}

export default UIVerticalContentList;