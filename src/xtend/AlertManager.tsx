import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'src/components/ui/Toast';
import UIPopAlert from 'components/ui/popup/UIPopAlert';

import * as globalSlice from 'src/redux/globalSlice';

const AlertManager = () => {
  const dispatch = useDispatch();

  const { alert, toast, displayPopName } = useSelector((state: any) => state.global);
  
  const handleClose = () => {
    dispatch(globalSlice.setDisplayPopName(''));
  }

  // // 팝업업 활성화시 스크롤 막음
  useEffect(() => {
    if(displayPopName) {
      document.documentElement.style.overflowY = 'hidden';
    } else {
      document.documentElement.style.overflowY = 'auto';
    }
  }, [displayPopName])


  return (
    <>
    { toast && (
    <div className='toast-container'>
      <Toast
        message={toast.message}
        duration={toast.duration}
      />
    </div>
    )}
    { alert && (
      <UIPopAlert/>
    )}
    </>
  )
}

export default AlertManager;