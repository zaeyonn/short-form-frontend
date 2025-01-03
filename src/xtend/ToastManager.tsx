import { useSelector, useDispatch } from 'react-redux';
import * as globalSlice from 'src/redux/globalSlice';
import Toast from 'src/components/ui/Toast';

const ToastManager = () => {
  const dispatch = useDispatch();
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