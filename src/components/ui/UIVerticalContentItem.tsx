interface Props {
  item: any;
  handleSeriesPlayerOpen: (series: any) => any;
}

const UIVerticalContentItem = ({item, handleSeriesPlayerOpen}: Props) => {
  return (
    <div className='vertical-content-item' onClick={() => handleSeriesPlayerOpen(item)}>
      <img src={`${import.meta.env.VITE_SERVER_URL}/images/poster/${item.poster_img}`}/>
      <div className='info-wrap'>
        <div className='tag-list'>
          { item.keyword?.map((i: string, index: number) => <span className='tag' key={index}>{i}</span>) }
        </div>
        <div className='title'>
          { item.title }
        </div>
        <div className='description'>
          { item.description }
        </div>
        <div className='ep-step'>
          { `0/${item.ep_count}` }
        </div>
      </div>
    </div>
  )
}

export default UIVerticalContentItem;