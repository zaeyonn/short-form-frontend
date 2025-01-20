
const LayoutNavigationBar = () => {

  return (
    <div className='navigation-bar'>
      <div className='wrap'>
        <div className="left-section">
          <span className="title">Framez</span>
          <span>카테고리</span>
          <span>북마크</span>
        </div>
        <div className='right-section'>
          <div className='profile-btn'>
            <img src={`resources/icons/icon_profile_gray_m.svg`}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LayoutNavigationBar;