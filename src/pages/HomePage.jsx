import { useNavigate } from "react-router";
import { useEffect } from "react";
import Video from "../components/Video";

export default function HomePage() {
  const navigate = useNavigate();
  const localUser = localStorage.getItem('username');

  function handleClickVideo(link) {
    console.log('link => ', link);
  }

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
          {/* <video controls>
            <source
              src="/videos/sample-cat-vid.mp4"
              type="video/mp4"
            />
          </video> */}
          <Video
            video_link="/efkkek"
            user_id={{ name: 'test' }}
            video_name="ทดสอบชื่อคลิป"
            onClick={(link) => handleClickVideo(link)}
          />
          <Video
            user_id={{ name: 'test' }}
            video_name="ทดสอบชื่อคลิป"
          />
          <Video
            user_id={{ name: 'test' }}
            video_name="ทดสอบชื่อคลิป"
          />
          <Video
            user_id={{ name: 'test' }}
            video_name="ทดสอบชื่อคลิป"
          />
          <Video
            user_id={{ name: 'test' }}
            video_name="ทดสอบชื่อคลิป"
          />
        </div>
      </div>
    </div>
  );
}