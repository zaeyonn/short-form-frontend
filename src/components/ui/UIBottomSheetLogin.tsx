import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSpring, animated } from '@react-spring/web';
import { useGesture } from "@use-gesture/react";

import * as globalSlice from "src/redux/globalSlice";

interface Props {
  visible: boolean;
  handleLoginBottomSheetClose: () => any;
}

const UIBottomSheetLogin = ({ visible, handleLoginBottomSheetClose }: Props) => {
  const dispatch = useDispatch();

  const [springs, api] = useSpring(() => ({
      from: { y: 280 },
      config: {mass: 1.1, tension: 270, friction: 25},
    }));

  const bind = useGesture(
    {
      onDrag: ({ down, movement: [_, my]}) => {
        api.start({ y: down ? (my > 20 ? my : 20) : 20, immediate: down })
      },
      onDragEnd: ({movement: [_, my]}) => {
        if(my > 20) {
          api.start({ y: 280 });
          handleLoginBottomSheetClose();
        }
      }
    }
  )  

  const handleClickGoogleLogin = () => {
    const loginUrl = `https://accounts.google.com/o/oauth2/auth?client_id=535162853227-526d2impnl311da6b2q95c2f2st10l7u.apps.googleusercontent.com&redirect_uri=http://localhost:5173&response_type=code&scope=email profile`;

    window.open(loginUrl, "sso", "height=700,width=480");
  }

  const handleGoogleLoginResult = (e: any) => {
    console.log(`result : ${e}`);
  }

  const handleClose = () => {
    api.start({ from: { y: 20 }, to: { y : 280 }});

    handleLoginBottomSheetClose();
  }

  useEffect(() => {
      if(visible) {
        api.start({ from: { y: 280 }, to: { y: 20 } });
      }
    }, [visible])

  useEffect(() => {
    window.addEventListener("message", handleGoogleLoginResult);

    return () => {
      window.removeEventListener("message", handleGoogleLoginResult);
    }
  }, [])

  return (
    <>
    { visible && (
      <div className='scrim' onClick={handleClose}/>
    )}
    <animated.div
    {...bind()}
    style={{
      ...springs,
      height: 280,
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
        <button>
          <img src="resources/icons/icon_google.svg"/>         
          Google로 계속하기 
        </button>
        <button className="email-auth">
          <img src="resources/icons/icon_email.svg"/>
          이메일로 계속하기          
        </button>
      </div>
    </animated.div>
    </>
  )
}

export default UIBottomSheetLogin;