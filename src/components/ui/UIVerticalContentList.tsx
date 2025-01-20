import UIVerticalContentItem from "./UIVerticalContentItem";

interface Props {
  seriesList: any[];
  headerTitle: string;
  handleSeriesListOpen: (title: string, seriesList: any[]) => any;

}

const UIVerticalContentList = ({seriesList, headerTitle, handleSeriesListOpen}: Props) => {
  return (
    <div className='vertical-content-list-wrap'>
      <div className='list-header' onClick={() => handleSeriesListOpen(headerTitle, seriesList)}>
        { headerTitle }
        <img src='resources/icons/icon_arrow_right_s.svg' alt='icon-arrow-right'/>
      </div>
      <div className='vertical-content-list'>
        {seriesList.map((i: any, index: number) => <UIVerticalContentItem item={i} key={index}/>)}
      </div>
    </div>
  )
}

export default UIVerticalContentList;