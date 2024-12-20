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
      localStorage.setItem('uuid', user.uuid);
      
      dispatch(userSlice.clearUserState('authGuestResult'));
      return;
    }
  }, [authGuestResult, authGuestError]);

  useEffect(() => {
    const uuid = localStorage.getItem('uuid');

    if (uuid) {
      dispatch(userSlice.setUser({uuid}))
    } else {
      dispatch(userSlice.authGuest());
    } 
  }, [])

  return null
}

export default AuthManager;