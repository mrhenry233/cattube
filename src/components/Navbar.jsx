import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import UserState from "../recoil/user";

export default function Navbar() {
  const navigate = useNavigate();
  const name = localStorage.getItem('name');
  const image = localStorage.getItem('image');

  return (
    <div className="fixed w-full h-16 bg-white flex justify-between items-center shadow-md p-4">
      <div
        className="flex items-end w-max cursor-pointer"
        onClick={() => navigate('/')}
      >
        <img
          alt="logo"
          src="/icons/logo.png"
          width={40}
        />
        <span className="text-primary font-bold">CATTUBE</span>
      </div>
      <div className="flex items-center w-max cursor-pointer">
        <img
          alt="user"
          src={image}
          width={40}
        />
        <span>{name}</span>
      </div>
    </div>
  );
}