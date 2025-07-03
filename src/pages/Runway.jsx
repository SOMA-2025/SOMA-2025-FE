import React, { useState, useCallback, memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { X } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import ReactDOM from 'react-dom';

const runwayImages = [
    require('../assets/dialysis/runway/다이앨러시스_길준영_runway_1.jpg'),
    require('../assets/dialysis/runway/다이앨러시스_길준영_runway_2.jpg'),
    require('../assets/dialysis/runway/다이앨러시스_김민규_runway_1.jpg'),
    require('../assets/dialysis/runway/다이앨러시스_김민규_runway_2.jpg'),
    require('../assets/dialysis/runway/다이앨러시스_문지원_runway_1.jpg'),
    require('../assets/dialysis/runway/다이앨러시스_문지원_runway_2.jpg'),
    require('../assets/dialysis/runway/다이앨러시스_박상현_runway_1.jpg'),
    require('../assets/dialysis/runway/다이앨러시스_박상현_runway_2.jpg'),
    require('../assets/dialysis/runway/다이앨러시스_박서희_runway_1.jpg'),
    require('../assets/dialysis/runway/다이앨러시스_박서희_runway_2.jpg'),
    require('../assets/dialysis/runway/다이앨러시스_양승연_runway_1.jpg'),
    require('../assets/dialysis/runway/다이앨러시스_양승연_runway_2.jpg'),
    require('../assets/dialysis/runway/다이앨러시스_이동준_runway_1.jpg'),
    require('../assets/dialysis/runway/다이앨러시스_이동준_runway_2.jpg'),
    require('../assets/dialysis/runway/다이앨러시스_이예진_runway_1.jpg'),
    require('../assets/dialysis/runway/다이앨러시스_이예진_runway_2.jpg'),
    require('../assets/dialysis/runway/다이앨러시스_전희진_runway_1.jpg'),
    require('../assets/dialysis/runway/다이앨러시스_전희진_runway_2.jpg'),

    require('../assets/bipolar/runway/바이폴라_곽현일_runway_1.jpg'),
    require('../assets/bipolar/runway/바이폴라_곽현일_runway_2.jpg'),
    require('../assets/bipolar/runway/바이폴라_마우천_runway_1.jpg'),
    require('../assets/bipolar/runway/바이폴라_마우천_runway_2.jpg'),
    require('../assets/bipolar/runway/바이폴라_무한우_runway_1.jpg'),
    require('../assets/bipolar/runway/바이폴라_무한우_runway_2.jpg'),
    require('../assets/bipolar/runway/바이폴라_범옥천_runway_1.jpg'),
    require('../assets/bipolar/runway/바이폴라_범옥천_runway_2.jpg'),
    require('../assets/bipolar/runway/바이폴라_사청의_runway_1.jpg'),
    require('../assets/bipolar/runway/바이폴라_사청의_runway_2.jpg'),
    require('../assets/bipolar/runway/바이폴라_왕업가_runway_1.jpg'),
    require('../assets/bipolar/runway/바이폴라_왕업가_runway_2.jpg'),
    require('../assets/bipolar/runway/바이폴라_유가리_runway_1.jpg'),
    require('../assets/bipolar/runway/바이폴라_유가리_runway_2.jpg'),
    require('../assets/bipolar/runway/바이폴라_유한녕_runway_1.jpg'),
    require('../assets/bipolar/runway/바이폴라_유한녕_runway_2.jpg'),
    require('../assets/bipolar/runway/바이폴라_풍지가_runway_1.jpg'),
    require('../assets/bipolar/runway/바이폴라_풍지가_runway_2.jpg'),
    require('../assets/bipolar/runway/바이폴라_향림아_runway_1.jpg'),
    require('../assets/bipolar/runway/바이폴라_향림아_runway_2.jpg'),

    require('../assets/lucid-dream/runway/자각몽_김여름_runway_1.jpg'),
    require('../assets/lucid-dream/runway/자각몽_김여름_runway_2.jpg'),
    require('../assets/lucid-dream/runway/자각몽_문수연_runway_1.jpg'),
    require('../assets/lucid-dream/runway/자각몽_문수연_runway_2.jpg'),
    require('../assets/lucid-dream/runway/자각몽_이동권_runway_1.jpg'),
    require('../assets/lucid-dream/runway/자각몽_이동권_runway_2.jpg'),
    require('../assets/lucid-dream/runway/자각몽_이지원_runway_1.jpg'),
    require('../assets/lucid-dream/runway/자각몽_이지원_runway_2.jpg'),
    require('../assets/lucid-dream/runway/자각몽_주호천_runway_1.jpg'),
    require('../assets/lucid-dream/runway/자각몽_주호천_runway_2.jpg'),
    require('../assets/lucid-dream/runway/자각몽_최진우_runway_1.jpg'),
    require('../assets/lucid-dream/runway/자각몽_최진우_runway_2.jpg'),
    require('../assets/lucid-dream/runway/자각몽_황윤경_runway_1.jpg'),
    require('../assets/lucid-dream/runway/자각몽_황윤경_runway_2.jpg'),

    require('../assets/dash/runway/대시_김나현_runway_1.jpg'),
    require('../assets/dash/runway/대시_김나현_runway_2.jpg'),
    require('../assets/dash/runway/대시_김솔이_runway_1.jpg'),
    require('../assets/dash/runway/대시_김솔이_runway_2.jpg'),
    require('../assets/dash/runway/대시_김여진_runway_1.jpg'),
    require('../assets/dash/runway/대시_김여진_runway_2.jpg'),
    require('../assets/dash/runway/대시_김영서_runway_1.jpg'),
    require('../assets/dash/runway/대시_김영서_runway_2.jpg'),
    require('../assets/dash/runway/대시_박정윤_runway_1.jpg'),
    require('../assets/dash/runway/대시_박정윤_runway_2.jpg'),
    require('../assets/dash/runway/대시_배유빈_runway_1.jpg'),
    require('../assets/dash/runway/대시_배유빈_runway_2.jpg'),
    require('../assets/dash/runway/대시_송다연_runway_1.jpg'),
    require('../assets/dash/runway/대시_송다연_runway_2.jpg'),
    require('../assets/dash/runway/대시_신아림_runway_1.jpg'),
    require('../assets/dash/runway/대시_신아림_runway_2.jpg'),
    require('../assets/dash/runway/대시_최지연_runway_1.jpg'),
    require('../assets/dash/runway/대시_최지연_runway_2.jpg'),

    require('../assets/drift/runway/표류기_김주리_runway_1.jpg'),
    require('../assets/drift/runway/표류기_김주리_runway_2.jpg'),
    require('../assets/drift/runway/표류기_신승리_runway_1.jpg'),
    require('../assets/drift/runway/표류기_신승리_runway_2.jpg'),
    require('../assets/drift/runway/표류기_오제현_runway_1.jpg'),
    require('../assets/drift/runway/표류기_오제현_runway_2.jpg'),
    require('../assets/drift/runway/표류기_이현희_runway_1.jpg'),
    require('../assets/drift/runway/표류기_이현희_runway_2.jpg'),
    require('../assets/drift/runway/표류기_조수아_runway_1.jpg'),
    require('../assets/drift/runway/표류기_조수아_runway_2.jpg'),
    require('../assets/drift/runway/표류기_허재범_runway_1.jpg'),
    require('../assets/drift/runway/표류기_허재범_runway_2.jpg'),
    require('../assets/drift/runway/표류기_허주연_runway_1.jpg'),
    require('../assets/drift/runway/표류기_허주연_runway_2.jpg'),
    require('../assets/drift/runway/표류기_현정은_runway_1.jpg'),
    require('../assets/drift/runway/표류기_현정은_runway_2.jpg'),

    require('../assets/agiotita/runway/아지오티타_김규빈_runway_1.jpg'),
    require('../assets/agiotita/runway/아지오티타_김규빈_runway_2.jpg'),
    require('../assets/agiotita/runway/아지오티타_김주현_runway_1.jpg'),
    require('../assets/agiotita/runway/아지오티타_김주현_runway_2.jpg'),
    require('../assets/agiotita/runway/아지오티타_김지향_runway_1.jpg'),
    require('../assets/agiotita/runway/아지오티타_김지향_runway_2.jpg'),
    require('../assets/agiotita/runway/아지오티타_수한_runway_1.jpg'),
    require('../assets/agiotita/runway/아지오티타_수한_runway_2.jpg'),
    require('../assets/agiotita/runway/아지오티타_유예리_runway_1.jpg'),
    require('../assets/agiotita/runway/아지오티타_유예리_runway_2.jpg'),
    require('../assets/agiotita/runway/아지오티타_이승주_runway_1.jpg'),
    require('../assets/agiotita/runway/아지오티타_이승주_runway_2.jpg'),
    require('../assets/agiotita/runway/아지오티타_최정연_runway_1.jpg'),
    require('../assets/agiotita/runway/아지오티타_최정연_runway_2.jpg'),
];

/* 유튜브 정보 */
const videos = [
    { src: 'https://www.youtube.com/embed/I6ZhuIJTGug', title: 'RUNWAY 1', thumb: '/2025/thumbs/1ST_showfilm_.jpeg' },
    { src: 'https://www.youtube.com/embed/FiBDt4KMncY', title: 'RUNWAY 2', thumb: '/2025/thumbs/2ND_showfilm_.jpeg' },
];

const ImageSlider = memo(({ onImageClick }) => (
    <section>
        <Swiper
            modules={[Navigation]}
            slidesPerView={4}
            // grid={{ fill: 'row' }}  1357 / 2468
            spaceBetween={8}
            navigation

            breakpoints={{
                0: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
            }}
            className="select-none"
        >
            {runwayImages.map((src, idx) => (
                <SwiperSlide key={idx}>
                    <img
                        src={src}
                        alt=""
                        loading="lazy"
                        draggable={false}
                        className="w-full h-full object-contain"
                        onClick={() => onImageClick(src)}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    </section>
));

export default function Runway() {
    const [zoomSrc, setZoomSrc] = useState(null);
    const [expanded, setExpanded] = useState(null);
    const ZoomModal = ({ src, onClose }) => (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70"
            onClick={onClose}
        >
            <button
                className="absolute top-6 right-6 text-white"
                aria-label="닫기"
            >
                <X size={32} />
            </button>
            <img
                src={src}
                alt="Zoomed runway"
                className="max-h-[90vh] max-w-[90vw] object-contain"
            />
        </div>
    );
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

                            {/* 확대 후 */}
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
    const handleZoom = useCallback(src => setZoomSrc(src), []);


    return (
        <div className=" max-w-[1140px] mx-auto px-4 py-12 space-y-16">
            <VideoSection />
            <ImageSlider onImageClick={handleZoom} />

            {zoomSrc &&
                ReactDOM.createPortal(
                    <ZoomModal src={zoomSrc} onClose={() => setZoomSrc(null)} />,
                    document.body
                )}

        </div>
    );
}
