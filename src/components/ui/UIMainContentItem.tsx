interface Props {
  item: any; 
  handleSeriesPlayerOpen: (series: any) => any;
}

const UIMainContentItem = ({item, handleSeriesPlayerOpen}: Props) => {
  return (
    <div className='main-content-item'>
      <div className='img-wrap' onClick={() => handleSeriesPlayerOpen(item)}>
      <img draggable='false' src={`${import.meta.env.VITE_SERVER_URL}/images/poster/${item.poster_img}`}/>
      <div className='text-wrap'>
        <div className='main-text'>{item.title}</div>
        <div className='sub-text'>{item.description}</div>
      </div>
      </div>
    </div>
  )
}

export default UIMainContentItem;