import { useSelector } from 'react-redux';
import Toast from 'src/components/ui/Toast';

const ToastManager = () => {
  const { toast } = useSelector((state: any) => state.global);
  
  return (
    <div className='toast-container'>
      {toast && (
        <Toast
          message={toast.message}
          duration={toast.duration}
        />
      )}
    </div>
  )
}

export default ToastManager;