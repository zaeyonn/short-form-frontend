import { useSelector } from 'react-redux';

const UIPopAlert = () => {
  const { alert } = useSelector((state: any) => state.global);

  return (
    <> 
    <div className='scrim'></div>
    <div className='popup-alert'>
      <div className='title'>{alert.title}</div>
      <div className='message'>{alert.message}</div>
      <div className='footer'>
        <button className='cancel' onClick={alert.cancelBtn.event}>
          {alert.cancelBtn.text}
        </button>
        <div className='divider'/>
        <button className='confirm' onClick={alert.confirmBtn.event}>
          {alert.confirmBtn.text}
        </button>
      </div>
    </div>
    </>
  )
}

export default UIPopAlert;