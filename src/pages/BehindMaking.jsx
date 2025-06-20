import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const imagePaths = [
    "/2025/behind/making/001.jpeg",
    "/2025/behind/making/002.jpeg",
    "/2025/behind/making/003.jpeg",
    "/2025/behind/making/004.jpeg",
    "/2025/behind/making/005.jpeg",
    "/2025/behind/making/006.jpeg",
    "/2025/behind/making/007.jpeg",
    "/2025/behind/making/008.jpeg",
    "/2025/behind/making/010.jpeg",
    "/2025/behind/making/011.jpeg",
    "/2025/behind/making/012.jpeg",
    "/2025/behind/making/013.jpeg",
    "/2025/behind/making/014.jpeg",
    "/2025/behind/making/015.jpeg",
];

export default function BehindMaking() {
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
            <ImageSlider />
        </div>
    );
}