import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Video from "../components/Video";
import axios from "axios";
import { baseURL } from '../api';
import { useSetRecoilState } from "recoil";
import CurrentVideoPlaying from '../recoil/currentVideoPlaying';

export default function HomePage() {
  const navigate = useNavigate();
  const setCurrentVideoPlaying = useSetRecoilState(CurrentVideoPlaying);
  const localUser = localStorage.getItem('username');
  const [videos, setVideos] = useState([]);

  async function handleGetVideos() {
    const response = await axios.get(`${baseURL}/media/all_videos`);
    setVideos(response.data);
  };

  useEffect(() => {
    handleGetVideos();
  }, []);

  useEffect(() => {
    if (!localUser) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localUser]);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-col p-4">
        <div className="grid grid-cols-4 gap-x-6 gap-y-8">
          {videos.map((video) => (
            <Video
              key={video.id}
              user={video.user}
              onClick={() => {
                setCurrentVideoPlaying({
                  id: video.id,
                  video_link: video.video_link,
                  video_name: video.video_name,
                  user: {
                    id: video.user.id,
                    name: video.user.name,
                    image: video.user.image,
                  },
                });
                navigate('/video/watch');
              }}
              video_link={video.video_link}
              video_name={video.video_name}
              isShowOwner
            />
          ))}
        </div>
      </div>
    </div>
  );
}