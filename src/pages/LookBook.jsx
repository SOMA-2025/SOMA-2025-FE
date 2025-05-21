import React, { useEffect, useState, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight } from "lucide-react";

const LookBook = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
    const bookRef = useRef();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            setViewportHeight(window.innerHeight);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const imagePaths = Array.from({ length: 252 }, (_, i) => {
        const suffix = i === 0 ? "" : (i + 1).toString();
        return `/2025/lookbook/SOMA2025${suffix}.jpg`;
    });

    return (
        <div className="relative flex justify-center items-center overflow-hidden"
            style={{ height: `calc(${viewportHeight}px)` }}>

            {/* 좌측 버튼 */}
            <button
                onClick={() => bookRef.current.pageFlip().flipPrev()}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white/90 rounded-full p-2 shadow"
            >
                <ChevronLeft size={24} />
            </button>

            {/* 플립북 */}
            <div
                style={{
                    width: "100%",
                    maxWidth: "90vw",
                    height: "100dvh",
                    margin: "0 auto",
                }}
            >
                <HTMLFlipBook
                    key={isMobile ? "mobile" : "desktop"} // ✅ 상태 바뀌면 컴포넌트 강제 재생성
                    ref={bookRef}
                    width={1571}
                    height={2000}
                    size="stretch"
                    usePortrait={isMobile} // ✅ true: 단면 / false: 양면
                    minWidth={300}
                    maxWidth={1000}
                    minHeight={400}
                    showCover={true}
                    style={{ width: "100%", height: "100%" }}
                >
                    {imagePaths.map((src, i) => (
                        <div key={i} className="w-full h-full">
                            <img
                                src={src}
                                alt={`page-${i + 1}`}
                                className="w-full h-full object-contain"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </HTMLFlipBook>
            </div>

            {/* 우측 버튼 */}
            <button
                onClick={() => bookRef.current.pageFlip().flipNext()}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white/90 rounded-full p-2 shadow"
            >
                <ChevronRight size={24} />
            </button>
        </div>
    );
};

export default LookBook;
