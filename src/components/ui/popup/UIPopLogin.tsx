import { useDispatch } from 'react-redux';

import * as globalSlice from 'src/redux/globalSlice';
import SignInWithGoogle from 'components/sns/SignInWithGoogle';

interface Props {
  signInProcess: (code: string, authType: string) => any;
}

const UIPopLogin = (props: Props) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(globalSlice.setDisplayPopName(''));
  }

  return (
    <div className='popup-layer'>
    <div className='popup-wrap'>    
      <img className='close-btn' src='/resources/icons/icon_close.svg' alt='닫기' onClick={handleClose}/>
      <div className='popup-body' style={{gap: 10}}>
        <div className='title'>
        {"로그인 / 회원가입하고\n다양한 컨텐츠를 만나보세요!"}
        </div>
        <div className="auth-btn-list">
        <SignInWithGoogle
          signInProcess={props.signInProcess}/>
        {/* <button className="email-auth" onClick={handleEmailSignUp}>
          <img src="resources/icons/icon_email.svg"/>
          이메일로 계속하기          
        </button> */}
        </div>
        </div>
      </div>
    </div>
  )
}

export default UIPopLogin;