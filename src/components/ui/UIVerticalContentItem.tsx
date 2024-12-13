interface Props {
  item: any
}

const UIVerticalContentItem = ({item}: Props) => {
  return (
    <div className='vertical-content-item'>
      <img src={item.url}/>
      <div className='info-wrap'>
        <div className='tag-list'>
          { item.keyword.map((i: string, index: number) => <span className='tag' key={index}>{i}</span>) }
        </div>
        <div className='title'>
          { item.title }
        </div>
        <div className='description'>
          { item.description }
        </div>
        <div className='ep-step'>
          { `${item.cur_ep}/${item.full_ep}` }
        </div>
      </div>
    </div>
  )
}

export default UIVerticalContentItem;