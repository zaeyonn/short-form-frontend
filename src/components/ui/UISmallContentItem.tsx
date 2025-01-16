import { useNavigate } from "react-router-dom";

interface SallContentItemProps {
  item: any;
  highlight?: string;
}

const UISmallContentItem = ({item, highlight}: SallContentItemProps) => {
  const navigate = useNavigate();

  const handleSeriesPlayerOpen = () => {
    navigate(`/series/${item.id}`);
  }
  
  return (
    <div draggable={false} className='small-content-item' onClick={(e) => handleSeriesPlayerOpen()}>  
      <div className='poster-wrap'>
        {highlight && (
          <span className='highlight'>{highlight}</span>
        )}
        <div className='tag-list'>
          { item.keyword?.map((i: string, idx: number) => <span className='tag' key={idx}>{i}</span>) }
        </div>
        <img draggable={false} className='poster-img' src={`${import.meta.env.VITE_SERVER_URL}/images/poster/${item.poster_img}`}/>
      </div>
      <div className='title'>{item.title}</div>
    </div>
  )
}

export default UISmallContentItem;