import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Button } from "../components/common/Buttons";
import { Input } from "../components/common/Inputs";
import { baseURL } from "../api";
import { useSetRecoilState } from "recoil";
import UserState from "../recoil/user";

export default function LoginPage() {
  const navigate = useNavigate();
  const localUser = localStorage.getItem('username');
  const setUser = useSetRecoilState(UserState);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleCheckCanProcess() {
    return username.trim().length > 0 && password.trim().length > 0;
  }

  async function handleLogin() {
    const response = await axios
      .post(`${baseURL}/login`, JSON.stringify({ uid: username, password }), { headers: { 'Content-Type': 'application/json' } });
    if (response.data) {
      localStorage.setItem('username', response.data.username);
      setUser(response.data)
      navigate('/')
    } else {
      alert('Username หรือ Password ผิดพลาด หรือ Server Error กรุณาลองตรวจสอบอีกครั้ง');
    }
  };

  useEffect(() => {
    if (localUser) navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localUser]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-max flex flex-col border rounded p-4 text-center gap-y-4">
        <img
          alt="logo"
          src="/icons/logo.png"
          width={100}
          className="mx-auto"
        />
        <span className="text-lg font-bold text-gray-600">เข้าสู่ระบบ Cattube</span>
        <div className="w-96 flex flex-col gap-y-2">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-[70px]"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-[70px]"
            type="password"
          />
        </div>
        <Button
          className={`text-white w-full ${handleCheckCanProcess() ? 'bg-primary hover:bg-subPrimary' : 'bg-gray-300'}`}
          disabled={!handleCheckCanProcess()}
          onClick={handleLogin}
        >
          เข้าสู่ระบบ
        </Button>
        <span className="text-gray-600">หากยังไม่มีบัญชี?</span>
        <span className="text-primary text-lg hover:text-subPrimary cursor-pointer">สมัครสมาชิกเพื่อเพิ่มช่องของคุณ</span>
      </div>
    </div>
  );
}