const LayoutNavigationBar = () => {
  return (
    <div className='nav-bar'>
      <div className="left-section">
        <img src='resources/icons/icon_hamburger.svg'/>
        <span className="title">Logo</span>
      </div>
      <div className='right-section'>
        <img src='resources/icons/icon_search.svg'/>
        <button>로그인</button>
      </div>
    </div>
  )
}

export default LayoutNavigationBar;