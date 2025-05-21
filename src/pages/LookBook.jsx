import React, { useEffect, useState, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight } from "lucide-react";

const teams = [
    { name: "AGIOTITA", pageIndex: 5 },
    { name: "BIPOLAR", pageIndex: 47 },
    { name: '"- - -"', pageIndex: 95 },
    { name: "Dialysis", pageIndex: 137 },
    { name: "표류[]기", pageIndex: 179 },
    { name: "자각몽", pageIndex: 217 },
];

const isGalaxyDevice = () => {
    const ua = navigator.userAgent.toLowerCase();
    return (
        ua.includes("samsung") ||
        ua.includes("sm-") ||
        ua.includes("galaxy") ||
        (ua.includes("android") && ua.includes("mobile"))
    );
};


const LookBook = () => {
    const bookRef = useRef();

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [headerHeight, setHeaderHeight] = useState(
        window.innerWidth >= 1024 ? 190 : 52
    );

    const goToPage = (index) => {
        if (bookRef.current?.pageFlip) {
            bookRef.current.pageFlip().flip(index);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768);
            setHeaderHeight(width >= 1024 ? 190 : 52);
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
        <div
            className="relative flex justify-center items-center overflow-hidden"
            style={{ height: `calc(100dvh - ${headerHeight}px)` }}
        >
            {/* 좌측 버튼 */}
            <button
                onClick={() => bookRef.current?.pageFlip().flipPrev()}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white/90 rounded-full p-2 shadow"
            >
                <ChevronLeft size={24} />
            </button>

            {/* 플립북 */}
            <div
                style={{
                    width: "100%",
                    maxWidth: "90vw",
                    height: "100%",
                    margin: "0 auto",
                }}
            >
                <HTMLFlipBook
                    key={isMobile ? "mobile" : "desktop"} // 모바일 단면 / 데스크탑 양면 적용
                    ref={bookRef}
                    width={1571}
                    height={2000}
                    size="stretch"
                    usePortrait={isMobile}
                    mobileScrollSupport={false}
                    // drawShadow={false}
                    // flippingTime={300}   
                    drawShadow={!isGalaxyDevice()}
                    minWidth={300}
                    maxWidth={1000}
                    minHeight={400}
                    //   showCover={true}
                    style={{ width: "100%", height: "100%", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", }}
                >
                    {imagePaths.map((src, i) => (
                        <div key={i} className="w-full h-full">
                            <img
                                src={src}
                                alt={`page-${i + 1}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </HTMLFlipBook>
            </div>

            {/* 우측 버튼 */}
            <button
                onClick={() => bookRef.current?.pageFlip().flipNext()}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white/90 rounded-full p-2 shadow"
            >
                <ChevronRight size={24} />
            </button>

            {/* <div className="absolute bottom-4 z-10 flex flex-wrap justify-center gap-2 px-4">
                {teams.map((team) => (
                    <button
                        key={team.name}
                        onClick={() => goToPage(team.pageIndex)}
                        className="bg-white/50 hover:bg-white/80 text-black text-sm px-3 py-1 rounded border border-gray-300 backdrop-blur-sm transition whitespace-nowrap"
                    >
                        {team.name}
                    </button>
                ))}
            </div> */}
            <div className="absolute bottom-4 z-10 w-full px-10 max-w-[768px] mx-auto grid grid-cols-3 lg:flex lg:flex-nowrap justify-center gap-2">
                {teams.map((team) => (
                    <button
                        key={team.name}
                        onClick={() => goToPage(team.pageIndex)}
                        className="bg-white/10 hover:bg-white/80 text-black text-sm px-2 py-1 rounded border border-gray-300 backdrop-blur-sm transition w-full min-w-[96px] text-center"
                    >
                        {team.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LookBook;
