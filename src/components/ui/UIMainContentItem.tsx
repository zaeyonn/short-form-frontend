interface Props {
  item: any; 
  handleShortFormOpen: () => any;
}

const UIMainContentItem = ({item, handleShortFormOpen}: Props) => {
  return (
    <div className='main-content-item'>
      <div className='img-wrap' onClick={handleShortFormOpen}>
      <img draggable='false' src={item.url}/>
      <div className='text-wrap'>
        <div className='main-text'>{item.title}</div>
        <div className='sub-text'>{item.sub}</div>
      </div>
      </div>
    </div>
  )
}

export default UIMainContentItem;