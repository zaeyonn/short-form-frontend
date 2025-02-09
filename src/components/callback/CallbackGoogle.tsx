import { useEffect } from 'react';
import queryString from 'query-string';

const CallbackGoogle = () => {
  const query = queryString.parse(window.location.search);

  useEffect(() => {
    if(query) {
      if(query.code) {
        window.opener.postMessage({
          auth_type: 'google',
          code: query.code
        }, '*');

        closeWindow();
      }
    } else {
      window.alert('계정이 유효하지 않습니다.');
      closeWindow();
    }
  }, [])

  const closeWindow = () => {
    window.close();
  }

  return (
    <div className='sns-auth-callback'>
      <button onClick={closeWindow}>닫기</button>
    </div>
  )
}

export default CallbackGoogle;