import { useState } from "react";
import { useNavigate, useLocation } from "react-router";

export default function Navbar() {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const name = localStorage.getItem('name');
  const image = localStorage.getItem('image');
  const [isShowMenu, setIsShowMenu] = useState(false);

  function handleLogout() {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className={`fixed z-30 w-full h-16 bg-white flex justify-between items-center shadow-md p-4 ${(pathname === '/login' || pathname === '/register') && 'invisible'}`}>
      <div
        className="flex items-end w-max cursor-pointer"
        onClick={() => navigate('/')}
      >
        <img
          alt="logo"
          src="/icons/logo.png"
          width={40}
          className="rounded-full"
        />
        <span className="text-primary font-bold">CATTUBE</span>
      </div>
      <div className="flex items-center w-max cursor-pointer relative gap-x-4" onClick={() => setIsShowMenu((prev) => !prev)}>
        <img
          alt="user"
          src={image}
          width={40}
          className="rounded-full"
        />
        <span>{name}</span>
        <div className={`absolute z-50 bg-white top-12 right-0 rounded border flex flex-col ${isShowMenu ? 'visible' : 'invisible'}`}>
          <span
            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => navigate('/video/upload')}
          >
            อัปโหลดวิดิโอ
          </span>
          <hr />
          <span
            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => navigate(`/video/chanel/${name}`)}
          >
            วิดิโอของฉัน
          </span>
          <hr />
          <span
            className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-red-500"
            onClick={handleLogout}
          >
            ออกจากระบบ
          </span>
        </div>
      </div>
    </div>
  );
}