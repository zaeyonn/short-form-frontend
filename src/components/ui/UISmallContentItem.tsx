import { useNavigate } from "react-router-dom";

interface SallContentItemProps {
  item: any;
  highlight?: string;
  dragging: boolean;
}

const UISmallContentItem = ({item, highlight, dragging}: SallContentItemProps) => {
  const navigate = useNavigate();

  const handleSeriesPlayerOpen = () => {
    if(!dragging) {
      navigate(`/series/${item.id}`);
      
      console.log('window.scrollY', window.scrollY); 
      sessionStorage.setItem('scrollY', String(window));
    }
  }
  
  return (
    <div draggable={false} className='small-content-item' onMouseUp={() => handleSeriesPlayerOpen()}>  
      <div className='poster-wrap'>
        {highlight && (
          <span className='highlight'>{highlight}</span>
        )}
        <div className='tag-list'>
          { item.keyword?.map((i: string, idx: number) => <span className='tag' key={idx}>{i}</span>) }
        </div>
        <img draggable={false} className='poster-img' src={`/resources/images/posters/${item.poster_img}`}/>
      </div>
      <div className='series-title'>{item.title}</div>
    </div>
  )
}

export default UISmallContentItem;