import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import { baseURL } from '../api';
import { Button } from '../components/common/Buttons';
import { Input } from '../components/common/Inputs';
import UserState from '../recoil/user';

export default function UploadVideoPage() {
  const navigate = useNavigate();
  const user = useRecoilValue(UserState);
  const [base64Video, setBase64Video] = useState('');
  const [isError, setIsError] = useState(false);
  const [videoDetail, setVideoDetail] = useState({
    name: '',
    size: '',
    type: '',
  });
  const [isUploading, setIsUploading] = useState(false);

  function handleConvertVideoToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    })
  };

  async function handleChangeVideo(e) {
    setBase64Video('');
    const file = e.target.files[0];
    setVideoDetail({
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2),
      type: file.type,
    });

    await handleConvertVideoToBase64(file)
      .then((res) => setBase64Video(res))
      .catch((error) => console.log(error));
  };

  function handleCheckCanProcess() {
    const isNoError = videoDetail.size <= 0.7;
    return videoDetail.name.trim().length > 0 && base64Video.length > 0 && isNoError;
  };

  async function handleUpload() {
    setIsUploading(true);
    const apiData = {
      user_id: user.id,
      video_link: base64Video,
      video_name: videoDetail.name,
      thumbnail: '',
    };
    const response = await axios
      .post(`${baseURL}/media/create`, JSON.stringify(apiData), { headers: { 'Content-Type': 'application/json' } });
    if (response.status === 200) {
      if (isError) setIsError(false);
      navigate(`/video/chanel/${localStorage.getItem('userID')}`);
    } else {
      setIsUploading(false);
      setIsError(true);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <span className="font-bold text-3xl text-center text-gray-700">อัปโหลดวิดิโอใหม่</span>
      <div className="w-[800px] mt-8 p-10 justify-center items-center flex flex-col mx-auto border border-dotted rounded gap-y-4">
        <div className="w-96 flex flex-col gap-y-4">
          <label
            htmlFor="upload_video"
            className="bg-white cursor-pointer border border-primary text-primary w-max mx-auto hover:text-white hover:bg-primary rounded-md p-2"
          >
            <input
              id="upload_video"
              type="file"
              accept="video/mp4"
              className="hidden"
              onChange={(e) => handleChangeVideo(e)}
            />
            เลือกวิดิโอเพื่ออัปโหลด
          </label>
          <span className="text-sm text-gray-400 text-center">รองรับเฉพาะไฟล์ MP4 ขนาดเล็ก ไม่เกิน 700 KB เท่านั้น</span>
          {base64Video && (
            <div className="w-full flex flex-col gap-y-2">
              <video controls autoPlay>
                <source
                  src={base64Video}
                />
              </video>
              <div className="flex flex-col gap-y-1 text-gray-600 text-sm">
                <span className={`font-bold ${videoDetail.size > 0.7 && 'text-red-500'}`}>ขนาดไฟล์: <span className="font-normal">{videoDetail.size}</span> MB</span>
                <span className={`font-bold ${videoDetail.type !== 'video/mp4' && 'text-red-500'}`}>นามสกุลไฟล์: <span className="font-normal">{videoDetail.type.split('/')[1]}</span></span>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-y-1">
            <span className="w-max text-gray-500">ชื่อวิดิโอ</span>
            <Input
              placeholder="กรอกชื่อวิดิโอ"
              value={videoDetail.name}
              onChange={(e) => setVideoDetail({ ...videoDetail, name: e.target.value })}
            />
          </div>
          <Button
            disabled={!handleCheckCanProcess() || isUploading}
            className={`w-full text-white ${handleCheckCanProcess() && !isUploading ? 'bg-primary hover:bg-subPrimary' : 'bg-gray-300'}`}
            onClick={handleUpload}
          >
            {isUploading ? 'กำลังอัปโหลด' : 'อัปโหลด'}
          </Button>
          {isError && <span className="text-center text-red-500">เกิดข้อผิดพลาดในการอัปโหลด กรุณาลองใหม่อีกครั้ง</span>}
        </div>
      </div>
    </div>
  );
}