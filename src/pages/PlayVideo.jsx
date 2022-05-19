import { useParams } from "react-router";

export default function PlayVideo() {
  const param = useParams();
  const { id } = param;

  return (
    <div>play video</div>
  );
}