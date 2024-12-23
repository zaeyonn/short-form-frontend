import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as userSlice from 'src/redux/userSlice';

const AuthManager = () => {
  const dispatch = useDispatch();

  const { authGuestResult, authGuestError } = useSelector((state: any) => state.user);

  useEffect(() => {
    if(authGuestError) {
      console.log('authGuestError ', authGuestError);
      dispatch(userSlice.clearUserState('authGuestError'));
      return;
    }

    if(authGuestResult && authGuestResult.data.code === 201) {
      console.log('authGuestResult ', authGuestResult);
      const { user } = authGuestResult.data;
      localStorage.setItem('user-id', user.uuid);
      dispatch(userSlice.setUser({id: user.uuid}))
      
      dispatch(userSlice.clearUserState('authGuestResult'));
      return;
    }
  }, [authGuestResult, authGuestError]);

  useEffect(() => {
    const uuid = localStorage.getItem('user-id');

    if (uuid) {
      dispatch(userSlice.setUser({id: uuid}))
    } else {
      dispatch(userSlice.authGuest());
    } 
  }, [])

  return null
}

export default AuthManager;