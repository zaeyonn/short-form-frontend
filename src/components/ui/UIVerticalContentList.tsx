import UIVerticalContentItem from "./UIVerticalContentItem";

interface Props {
  contentList: any[];
  headerTitle: string;
  handleShortFormOpen: (series: any) => any;

}

const UIVerticalContentList = ({contentList, headerTitle, handleShortFormOpen}: Props) => {
  return (
    <div className='vertical-content-list-wrap'>
      <div className='header'>
        { headerTitle }
        <img src='resources/icons/icon_arrow_right_s.svg' alt='icon-arrow-right'/>
      </div>
      <div className='vertical-content-list'>
        {contentList.map((i: any, index: number) => <UIVerticalContentItem item={i} key={index} handleShortFormOpen={handleShortFormOpen}/>)}
      </div>
    </div>
  )
}

export default UIVerticalContentList;