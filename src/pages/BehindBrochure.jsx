import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation} from 'swiper/modules';
import { X } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';


const imagePaths = [
    "/2025/behind/brochure/001.jpeg",
    "/2025/behind/brochure/002.jpeg",
    "/2025/behind/brochure/003.jpeg",
    "/2025/behind/brochure/004.jpeg",
    "/2025/behind/brochure/005.jpeg",
    "/2025/behind/brochure/006.jpeg",
    "/2025/behind/brochure/007.jpeg",
    "/2025/behind/brochure/008.jpeg",
    "/2025/behind/brochure/009.jpeg",
    "/2025/behind/brochure/010.jpeg",
    "/2025/behind/brochure/011.jpeg",
    "/2025/behind/brochure/012.jpeg",
    "/2025/behind/brochure/013.jpeg",
    "/2025/behind/brochure/014.jpeg",
    "/2025/behind/brochure/015.jpeg",
    "/2025/behind/brochure/016.jpeg",
    "/2025/behind/brochure/017.jpeg",
    "/2025/behind/brochure/018.jpeg",
    "/2025/behind/brochure/019.jpeg",
    "/2025/behind/brochure/020.jpeg",
    "/2025/behind/brochure/021.jpeg",
    "/2025/behind/brochure/022.jpeg",
  ];

const videos = [
    { src: 'https://www.youtube.com/embed/7Kgi3zzsTj0', title: 'RUNWAY 1', thumb: '/2025/thumbs/bro_thumbnail_1.png' },
    { src: 'https://www.youtube.com/embed/BpKl3h0XzPc', title: 'RUNWAY 2', thumb: '/2025/thumbs/bro_thumbnail_2.png' },
    { src: 'https://www.youtube.com/embed/1AUTXvGAC0c', title: 'RUNWAY 3', thumb: '/2025/thumbs/bro_thumbnail_3.png' },
];

export default function BehindBrochure() {

    const [expanded, setExpanded] = useState(null);

    const VideoSection = () => (
        <section className="flex flex-col md:flex-row gap-4">
            {videos.map((v, idx) => {
                const isOpen = expanded === idx;
                const isHidden = expanded !== null && !isOpen;

                return (
                    <div
                        key={v.title}
                        className={`
                transition-all duration-300
                ${isOpen ? 'w-full' : 'w-full md:basis-[calc(50%-0.5rem)]'}
                ${isHidden && 'hidden'}
              `}
                        onClick={() => !isOpen && setExpanded(idx)}
                    >
                        <div className="w-full aspect-video relative rounded-lg shadow-md overflow-hidden group">
                            {/* 썸네일 */}
                            {!isOpen && (
                                <>
                                    <img
                                        src={v.thumb}
                                        alt={`${v.title} thumbnail`}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    {/* 중앙 재생 아이콘 */}
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                        <svg
                                            className="w-14 h-14 text-white/90"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </>
                            )}

                            {/* iframe 확대 후 */}
                            {isOpen && (
                                <>
                                    <iframe
                                        src={v.src}
                                        title={v.title}
                                        allowFullScreen
                                        className="w-full h-full border-0"
                                    />
                                    {/* 닫기 버튼 */}
                                    <button
                                        onClick={e => { e.stopPropagation(); setExpanded(null); }}
                                        className="absolute top-4 right-4 p-3 rounded-full bg-white/90 hover:bg-white text-black shadow-2xl backdrop-blur-md"
                                        aria-label="닫기"
                                    >
                                        <X size={28} strokeWidth={3.5} />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                );
            })}
        </section>
    );

    const ImageSlider = () => (
        <section>
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

        </section>
    );

    return (
        <div className=" max-w-[1140px] mx-auto px-4 py-12 space-y-16">
            <VideoSection />
            <ImageSlider />
        </div>
    );
}