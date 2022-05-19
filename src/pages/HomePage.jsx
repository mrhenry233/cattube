import { useNavigate } from "react-router";
import { useEffect } from "react";
import Navbar from "../components/Navbar";

export default function HomePage() {
  const navigate = useNavigate();
  const localUser = localStorage.getItem('username');

  useEffect(() => {
    if (!localUser) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localUser])
  return (
    <div className="w-full flex flex-col">
      <Navbar />
    </div>
  );
}