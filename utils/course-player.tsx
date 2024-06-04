"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface ICoursePlayer {
  videoUrl: string;
  title: string;
}

const CoursePlayer: React.FC<ICoursePlayer> = ({ videoUrl }) => {
  const [videoData, setVideoData] = useState({
    opt: "",
    playbackInfo: "",
  });

  useEffect(() => {
    axios
      .post(`http://localhost:5000/api/v1/get-vdo-cipher-otp`, {
        videoId: videoUrl,
      })
      .then((res) => {
        setVideoData(res.data);
      });
  }, [videoUrl]);

  return (
    <div className="p-[41%] relative">
      {videoData.opt && videoData.playbackInfo !== "" && (
        <div className="p-[41%] relative">
          <iframe
            // className="border-0 w-[90%] h-full absolute top-0 left-0"
            src={`https://player.vdocipher.com/v2/?otp=${videoData?.opt}&playbackInfo=${videoData?.playbackInfo}&player=G4WY5PHycrTU4Pr7`}
            allowFullScreen={true}
            allow="encrypted-media"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default CoursePlayer;
