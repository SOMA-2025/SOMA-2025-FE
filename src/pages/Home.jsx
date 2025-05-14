import React from 'react';


const Home = () => {
  return (

      <div
        className="
          bg-black
          relative
          h-[calc(100vh-52px)]
          lg:h-[calc(100vh-190px)]
          flex items-center justify-center
        "
      >
        {/* 🎥 제한된 영역에 영상 */}
        
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full object-contain"
          >
            <source
              src={`${process.env.PUBLIC_URL}/videos/SOMA2025_motionposter.mp4`}
            //   src={`${process.env.PUBLIC_URL}/videos/test_team3.mp4`}
              type="video/mp4"
            />
            브라우저가 비디오 태그를 지원하지 않습니다.
          </video>
       
      </div>

  );
};

export default Home;