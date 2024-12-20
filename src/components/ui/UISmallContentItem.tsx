
interface SallContentItemProps {
  item: any;
  highlight?: string;
  handleShortFormOpen: (series: any) => any;
}

const UISmallContentItem = ({item, highlight, handleShortFormOpen}: SallContentItemProps) => {
  return (
    <div className='small-content-item' onClick={() => handleShortFormOpen(item)}>  
      <div className='poster-wrap'>
        {highlight && (
          <span className='highlight'>{highlight}</span>
        )}
        <div className='tag-list'>
          { item.keyword?.map((i: string, idx: number) => <span className='tag' key={idx}>{i}</span>) }
        </div>
        <img className='poster-img' src={`${import.meta.env.VITE_SERVER_URL}/images/poster/${item.poster_img}`}/>
      </div>
      <div className='title'>{item.title}</div>
    </div>
  )
}

export default UISmallContentItem;