const UIScrollTopButton = () => {

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    })
  }

  return (
    <div id="scroll-top-btn" className='scroll-top-btn' onClick={handleScrollTop}>
      <img src={`/resources/icons/icon_arrow_up.svg`} />
    </div>
  )

}

export default UIScrollTopButton;