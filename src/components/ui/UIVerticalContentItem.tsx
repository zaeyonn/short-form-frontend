import { useNavigate } from 'react-router-dom';

interface Props {
  item: any;
}

const UIVerticalContentItem = ({item}: Props) => {
  const navigate = useNavigate();

  const handleSeriesPlayerOpen = () => {
    navigate(`/series/${item.id}`);
  }

  return (
    <div className='vertical-content-item' onClick={() => handleSeriesPlayerOpen()}>
      <img src={`${import.meta.env.VITE_SERVER_URL}/resources/images/poster/${item.poster_img}`}/>
      <div className='info-wrap'>
        <div className='tag-list'>
          { item.keyword?.map((i: string, index: number) => <span className='tag' key={index}>{i}</span>) }
        </div>
        <div className='series-title'>
          { item.title }
        </div>
        <div className='description'>

          { item.description }
        </div>
        {/* <div className='ep-step'>
          { `0/${item.ep_count}` }
        </div> */}
      </div>
    </div>
  )
}

export default UIVerticalContentItem;