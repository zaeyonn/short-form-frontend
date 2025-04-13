import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom"

import { UserRootState } from 'src/types';
import * as userSlice from 'src/redux/userSlice';
import * as globalSlice from 'src/redux/globalSlice';


const ProfileEditPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user, usersProfileUpdateResult, usersProfileUpdateError } = useSelector((state: UserRootState) => state.user);

	const [nickname, setNickname] = useState(user.nickname);
	const [visibleNicknameRule, setVisibleNicknameRule] = useState(false);
	const [disabled, setDisabled] = useState(true);

	const handleClose = () => {
		navigate(-1);
	}

	const handleLogout = () => {
		dispatch(userSlice.authGuest());
		navigate('/');
	};

	const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
		
		if (event.target.value.length > 10 || event.target.value.length < 2 || specialCharRegex.test(event.target.value)) {
			setDisabled(true);
			setVisibleNicknameRule(true);
		} else {
			setDisabled(false);
			setVisibleNicknameRule(false);
		}

		if(event.target.value === user.nickname) {
			setDisabled(true);
		}

		setNickname(event.target.value);
	}

	const handleSaveClick = () => {
		const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

		if (specialCharRegex.test(nickname)) {
			setVisibleNicknameRule(true);
			setDisabled(true);
			return;
		}

		if (nickname.length < 2 || nickname.length > 10) {
			setVisibleNicknameRule(true);
			setDisabled(true);
			return;
		}

		dispatch(userSlice.usersProfileUpdate({ userId: user.id, nickname }));
	}

	useEffect(() => {
		if(usersProfileUpdateError) {
			console.log('usersProfileUpdateError', usersProfileUpdateError);
			dispatch(globalSlice.addToast({
				id: new Date(),
				duration: 2000,
				message: '닉네임 변경에 실패했습니다.',
			}));
			dispatch(userSlice.clearUserState('usersProfileUpdateError'));
		}

		if(usersProfileUpdateResult && usersProfileUpdateResult.status === 200) {
			console.log('usersProfileUpdateResult', usersProfileUpdateResult);
			dispatch(globalSlice.addToast({
				id: new Date(),
				duration: 2000,
				message: '닉네임이 변경되었습니다.',
			}));
			dispatch(userSlice.setUser({ ...usersProfileUpdateResult.data, nickname })); // Update user state with new nickname
			dispatch(userSlice.clearUserState('usersProfileUpdateResult'));
			handleClose();
		}

	}, [usersProfileUpdateResult, usersProfileUpdateError])
	
	useEffect(() => {
		if (user.nickname) {
			setNickname(user.nickname);
		}
	}, [user]);

	return (
		<div className="page-wrap">
			<div className="header">
				<div className="left-section">
					<img
						src={`/resources/icons/icon_arrow_left_m.svg`}
						onClick={() => handleClose()}
					/>
				</div>
				<div className="title">내 프로필 관리</div>
				<div className="right-section">
					<span className="empty"/>
				</div>
			</div>
			<div className="page-body">
				<div className="p-title">
					닉네임
				</div>
				<input 
					className="nickname-input"
					value={nickname}
					type="text"
					onChange={handleNicknameChange}
				/>
				<div className={`nickname-rule ${visibleNicknameRule ? 'visible' : ''}`}>
					닉네임은 2~10자 이내로 입력해주세요. (특수문자 사용 불가)
				</div>
				<div className='p-title'>
				로그인 계정
				</div>
				<div className="email-wrap">
					{user.email}
				</div>
			</div>
			<div className='page-footer'>
					<div className='logout-wrap'>
						<span onClick={handleLogout}>로그아웃</span>
						<div className='divider'/>
						<span>계정 삭제</span>
					</div>
					<button disabled={disabled} className={`bottom-main-btn ${disabled ? 'disabled' : ''}`} onClick={handleSaveClick}>
						저장
					</button>
				</div>
		</div>
	)
}

export default ProfileEditPage