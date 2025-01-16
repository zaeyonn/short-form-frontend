import { useSelector } from 'react-redux';
import Toast from 'src/components/ui/Toast';
import UIPopAlert from 'components/ui/popup/UIPopAlert';

const AlertManager = () => {
  const { alert, toast } = useSelector((state: any) => state.global);
  
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