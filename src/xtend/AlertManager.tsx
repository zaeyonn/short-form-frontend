import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Toast from 'src/components/ui/Toast';
import UIPopAlert from 'components/ui/popup/UIPopAlert';
import UIScrollTopButton from 'components/ui/UIScrollTopButton';

const AlertManager = () => {

  const { alert, toast, displayPopName } = useSelector((state: any) => state.global);
  
  // // 팝업업 활성화시 스크롤 막음
  useEffect(() => {
    if(displayPopName) {
      document.documentElement.style.overflowY = 'hidden';
    } else {
      document.documentElement.style.overflowY = 'auto';
    }
  }, [displayPopName])

  useEffect(() => {
    const scrollTopButton = document.getElementById('scroll-top-btn');
    const handleScroll = () => {
      if(!scrollTopButton) return;

      if(window.scrollY > 300) {
        scrollTopButton.style.display = 'flex';
      } else {
        scrollTopButton.style.display = 'none';
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])


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
    <UIScrollTopButton/>
    </>
  )
}

export default AlertManager;