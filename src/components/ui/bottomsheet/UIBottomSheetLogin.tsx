import { useEffect, forwardRef, useImperativeHandle } from "react";
import { useSpring, animated } from '@react-spring/web';
import { useGesture } from "@use-gesture/react";

import SignInWithGoogle from "components/sns/SignInWithGoogle";
import SignInWithFacebook from "components/sns/SignInWithFacebook";
import SignInWithKakao from "components/sns/SignInWithKakao";

interface Props {
  visible: boolean;
  handleLoginBottomSheetClose: () => any;
  signInProcess: (code: string, authType: string) => any;
}

type bottomSheetHandle = {
  handleClose: () => void;
  
}

const UIBottomSheetLogin = forwardRef<bottomSheetHandle, Props>(({signInProcess, visible, handleLoginBottomSheetClose}: any, ref) => {
  const [springs, api] = useSpring(() => ({
      from: { y: 360 },
      config: {mass: 0.6, tension: 270, friction: 25},
  }));

  const bind = useGesture(
    {
      onDrag: ({ down, movement: [_, my]}) => {
        api.start({ y: down ? (my > 20 ? my : 20) : 20, immediate: down })
      },
      onDragEnd: ({movement: [_, my]}) => {
        if(my > 20) {
          api.start({ y: 360 });
          handleLoginBottomSheetClose();
        }
      }
    }
  )  

  const handleClose = () => {
    api.start({ from: { y: 20 }, to: { y : 360 }});

    handleLoginBottomSheetClose();
  }

  useImperativeHandle(ref, () => ({
    handleClose
  }))

  useEffect(() => {
      if(visible) {
        api.start({ from: { y: 360 }, to: { y: 20 } });
      } 
    }, [visible])

  return (
    <>
    { visible && (
      <div className='scrim' onClick={handleClose}/>
    )}
    <animated.div
    {...bind()}
    style={{
      ...springs,
      height: 360,
      backgroundColor: '#2A2A2A',
      touchAction: 'none'
    }} 
    className="bottom-sheet-wrap">
      <div className="head">
        <img className="close" src="resources/icons/icon_close.svg" onClick={handleClose}/>
        <div className='title center' style={{marginTop: 10}}>
        {"     로그인 / 회원가입하고\n다양한 컨텐츠를 만나보세요!"}
        </div>
      </div>
      <div className="auth-btn-list">
        <SignInWithKakao
          signInProcess={signInProcess}/>
          <SignInWithFacebook
            signInProcess={signInProcess}/>
        <SignInWithGoogle
          signInProcess={signInProcess}/>
      </div>
      <div className='auth-login-guide'>
        게스트 계정으로 얻은 보너스 코인은 연동되지 않습니다.
      </div>
    </animated.div>
    </>
  )
})

export default UIBottomSheetLogin;