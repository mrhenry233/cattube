import { atom } from "recoil";

const CurrentVideoPlayingState = atom({
  key: 'CurrentVideoPlayingState',
  default: {
    id: '',
    video_name: '',
    video_link: '',
    user: {
      id: '',
      name: '',
      image: '',
    },
  }
});

export default CurrentVideoPlayingState;
