interface Props {
  item: any; 
  handleShortFormOpen: (series: any) => any;
}

const UIMainContentItem = ({item, handleShortFormOpen}: Props) => {
  return (
    <div className='main-content-item'>
      <div className='img-wrap' onClick={() => handleShortFormOpen(item)}>
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