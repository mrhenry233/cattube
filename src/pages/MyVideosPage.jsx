import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { baseURL } from "../api";
import UserState from '../recoil/user';
import Video from '../components/Video';
import { useNavigate, useParams } from "react-router";
import CurrentVideoPlayingState from "../recoil/currentVideoPlaying";

export default function MyVideoPage() {
  const navigate = useNavigate();
  const param = useParams();
  const { chanel_name } = param;
  const user = useRecoilValue(UserState);
  const [videos, setVideos] = useState([]);
  const setCurrentVideoPlaying = useSetRecoilState(CurrentVideoPlayingState);

  async function handleFetchVideos() {
    const response = await axios.get(`${baseURL}/media/my_videos?user_id=${user.id}`);
    setVideos(response.data);
  };

  useEffect(() => {
    handleFetchVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex items-end gap-x-4">
        <div className="rounded-full w-max">
          <img
            alt="owner"
            src={user.image}
            width={100}
            className="rounded-full bg-white"
          />
        </div>
        <span className="font-semibold text-primary text-3xl">
          {user.name}
        </span>
      </div>
      <hr className="my-4" />
      <div className="w-full flex flex-col gap-y-4">
        <span className="text-gray-600 text-xl font-semibold">วิดิโอของ{chanel_name === user.name ? 'ฉัน' : user.name}</span>
        <div className="w-full grid grid-cols-5 gap-x-6 gap-y-8">
          {videos.map((video) => {
            return (
              <Video
                key={video.id}
                user_id={video.user_id}
                video_link={video.video_link}
                video_name={video.name}
                onClick={(id) => {
                  setCurrentVideoPlaying({
                    id,
                    video_link: video.video_link,
                    video_name: video.video_name,
                    user: {
                      id: video.user.id,
                      name: video.user.name,
                      image: video.user.image,
                    },
                  });
                  navigate(`/video/watch`);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}