import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const ShowBehindPage = () => {
  const imagePaths = [
    "/2025/behind/show/6F4A7911.jpg",
    "/2025/behind/show/6F4A8281.jpg",
    "/2025/behind/show/6F4A8658.jpg",
    "/2025/behind/show/6F4A9191.jpg",
    "/2025/behind/show/6F4A9348.jpg",

    "/2025/behind/show/6F4A7930.jpg",
    "/2025/behind/show/6F4A8325.jpg",
    "/2025/behind/show/6F4A8765.jpg",
    "/2025/behind/show/6F4A9194.jpg",
    "/2025/behind/show/6F4A9427.jpg",

    "/2025/behind/show/6F4A8128.jpg",
    "/2025/behind/show/6F4A8377.jpg",
    "/2025/behind/show/6F4A8895.jpg",
    "/2025/behind/show/6F4A9214.jpg",
    "/2025/behind/show/6F4A9446.jpg",

    "/2025/behind/show/6F4A8189.jpg",
    "/2025/behind/show/6F4A8503.jpg",
    "/2025/behind/show/6F4A8964.jpg",
    "/2025/behind/show/6F4A9254.jpg",
    "/2025/behind/show/6F4A9466.jpg",

    "/2025/behind/show/6F4A8199.jpg",
    "/2025/behind/show/6F4A8578.jpg",
    "/2025/behind/show/6F4A8990.jpg",
    "/2025/behind/show/6F4A9265.jpg",
    "/2025/behind/show/6F4A9488.jpg",

    "/2025/behind/show/6F4A8237.jpg",
    "/2025/behind/show/6F4A8636.jpg",
    "/2025/behind/show/6F4A9057.jpg",
    "/2025/behind/show/6F4A9300.jpg",
    "/2025/behind/show/6F4A9534.jpg",
  ];

  return (
    <div className="max-w-[1140px] mx-auto px-4 py-10 space-y-10">
      {/* video */}
      <div className="w-full aspect-video">
        <iframe
          src="https://www.youtube.com/embed/Si8vAV6KxEM"
          title="SHOW BEHIND"
          className="w-full h-full border-0"
          allowFullScreen
        />
      </div>

      {/* swiper */}
      <Swiper
        spaceBetween={20}
        navigation
        modules={[Navigation]}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full select-none "
      >
        {imagePaths.map((src, idx) => (
          <SwiperSlide key={idx} className="flex justify-center items-center">
            <img
              src={src}
              alt={`Show behind ${idx + 1}`}
              className="w-full max-h-[80vh] object-contain"
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ShowBehindPage;