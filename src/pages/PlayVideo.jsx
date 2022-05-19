import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import CurrentVideoPlayingState from "../recoil/currentVideoPlaying";

export default function PlayVideo() {
  const navigate = useNavigate();
  const currentVideoPlaying = useRecoilValue(CurrentVideoPlayingState);

  useEffect(() => {
    if (!currentVideoPlaying.id) navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVideoPlaying.id]);

  return (
    <div className="w-full flex flex-col gap-y-4">
      <span className="font-bold text-3xl text-primary">{currentVideoPlaying.video_name}</span>
      <span className="text-base text-gray-600">อัพโหลดโดย {currentVideoPlaying.user.name}</span>
      <div className="w-full flex flex-col justify-center items-center bg-black">
        <video controls autoPlay>
          <source src={currentVideoPlaying.video_link} />
        </video>
      </div>
    </div>
  );
}