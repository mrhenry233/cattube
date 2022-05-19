import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Input, TextArea } from '../components/common/Inputs';
import { Button } from '../components/common/Buttons';
import axios from "axios";
import { baseURL } from "../api";
import { useSetRecoilState } from "recoil";
import UserState from "../recoil/user";

export default function RegisterPage() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(UserState);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  function handleConvertImageToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    })
  }

  function handleCheckCanProcess() {
    return name.trim().length > 0 && username.trim().length > 0 && password.trim().length > 0;
  };

  async function handleChangeImage(e) {
    setImage('');
    const file = e.target.files[0];
    await handleConvertImageToBase64(file)
      .then((res) => setImage(res))
      .catch((error) => console.log(error));
  };

  async function handleRegister() {
    const data = {
      username,
      password,
      name,
      email: `${username}@mail.com`,
      description,
      image,
    };

    const response = await axios.post(`${baseURL}/user/create`, data);
    if (response.data) {
      console.log(response.data);
      localStorage.setItem('userID', response.data.id);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('image', response.data.image);
      localStorage.setItem('name', response.data.name);
      setUser(response.data);
      navigate('/');
    } else {
      alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้งภายหลัง');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('userID')) navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="w-max flex flex-col border rounded p-4 text-center gap-y-4">
        <span className="text-lg font-bold text-gray-600">ลงทะเบียน Cattube</span>
        <div className="w-96 flex flex-col gap-y-2">
          {image && (
            <img
              alt="chanel_image"
              src={image}
              width={120}
              className="rounded-full mx-auto"
            />
          )}
          <label
            htmlFor="upload_image"
            className="bg-white cursor-pointer border border-primary text-primary w-max mx-auto hover:text-white hover:bg-primary rounded-md p-2"
          >
            <input
              id="upload_image"
              type="file"
              accept="image/jpg, image/jpeg, image/png"
              className="hidden"
              onChange={(e) => handleChangeImage(e)}
            />
            เลือกรูปช่อง
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ชื่อช่อง (ต้องระบุ)"
          />
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="คำอธิบายเพิ่มเติมของช่อง"
            rows={3}
          />
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username (ต้องระบุ)"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (ต้องระบุ)"
            type="password"
          />
        </div>
        <Button
          className={`text-white w-full ${handleCheckCanProcess() ? 'bg-primary hover:bg-subPrimary' : 'bg-gray-300'}`}
          disabled={!handleCheckCanProcess()}
          onClick={handleRegister}
        >
          สมัครสมาชิก
        </Button>
        <Button
          className="w-full text-primary bg-white border border-primary hover:text-white hover:bg-primary"
          onClick={() => navigate('/login')}
        >
          กลับไปหน้าเข้าสู่ระบบ
        </Button>
      </div>
    </div>
  );
}