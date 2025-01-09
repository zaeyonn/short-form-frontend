import { useState } from 'react';
import { useDispatch } from "react-redux";

import * as globalSlice from 'src/redux/globalSlice';

const UIPopSignUp = () => {
  const [progress, setProgress] = useState(1);
  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(globalSlice.setDisplayPopName(''));
  }

  const handleNicknameChange = (e: any) => {
    setNickname(e.target.value);
  }

  const handleNicknameClear = () => {
    setNickname('');
  }

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  }

  const handleEmailClear = () => {
    setEmail('');
  }

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  }

  const handlePasswordClear = () => {
    setPassword('');
  }

  const handleNext = () => {
    setProgress(progress + 1); 
  }

  return (
    <div className='popup-wrap'>
      <div className='header'>
        <div className="left-section">
          <img src={`resources/icons/icon_arrow_left_m.svg`} onClick={handleClose}/>
        </div>
        <div className='right-section'>
          <div className='next-btn' onClick={handleNext}>
            다음
          </div>
        </div>
      </div>
      { progress === 1 && (
      <div className='sign-up'>
        <div className='label'>
        {`새로 만들 계정에 사용할 이름을 \n입력해주세요`}
        </div>
        <div className='input-wrap'>
          <input
          value={nickname}
          placeholder="예: 홍길동"
          onChange={handleNicknameChange}
          />
          { nickname && (
            <img src={'resources/icons/icon_input_clear.svg'} onClick={handleNicknameClear}/>
          )}
        </div>
        <div className='description'>
          대표 프로필 이름으로 사용돼요.
        </div>
      </div>
      )}
      { progress === 2 && (
      <div className='sign-up'>
        <div className='label'>
        {`사용할 이메일을 입력해주세요`}
        </div>
        <div className='input-wrap'>
          <input
          value={email}
          placeholder="예: example@gmail.com"
          onChange={handleEmailChange}
          />
          { email && (
            <img src={'resources/icons/icon_input_clear.svg'} onClick={handleEmailClear}/>
          )}
        </div>
        <div className='description'>
          결제 등 중요 알림, 로드인, 비밀번호 찾기에 사용돼요.
        </div>
      </div>
      )}
      { progress === 3 && (
      <div className='sign-up'>
        <div className='label'>
        {`로그인에 사용될 비밀번호를\n입력해주세요`}
        </div>
        <div className='input-wrap'>
          <input
          value={password}
          placeholder="비밀번호 입력"
          onChange={handlePasswordChange}
          />
          { email && (
            <img src={'resources/icons/icon_input_clear.svg'} onClick={handlePasswordClear}/>
          )}
        </div>
        <div className='description'>
          영문, 숫자, 특수문자 중 2개 이상 조합하여 8자 이상 입력해 주세요.
        </div>
      </div>
      )}
    </div>
  )
}

export default UIPopSignUp;