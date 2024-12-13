
interface SallContentItemProps {
  item: any;
  highlight?: string;
}

const UISmallContentItem = ({item, highlight}: SallContentItemProps) => {
  return (
    <div className='small-content-item'>  
      <div className='poster-wrap'>
        {highlight && (
          <span className='highlight'>{highlight}</span>
        )}
        <div className='tag-list'>
          { item.keyword.map((i: string, idx: number) => <span className='tag' key={idx}>{i}</span>) }
        </div>
        <img className='poster-img' src={item.url}/>
      </div>
      <div className='title'>{item.title}</div>
    </div>
  )
}

export default UISmallContentItem;