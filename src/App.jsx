import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import './index.css';
import UserState from './recoil/user';
import Routes from './Routes';

function App() {
  const setUser = useSetRecoilState(UserState);

  useEffect(() => {
    setUser({
      id: localStorage.getItem('userID'),
      name: localStorage.getItem('name'),
      username: localStorage.getItem('username'),
      image: localStorage.getItem('image'),
      email: localStorage.getItem('email'),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage]);

  return (
    <Routes />
  );
}

export default App;
