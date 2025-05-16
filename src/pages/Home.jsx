import React, { useState, useEffect, useRef } from 'react';

const videoList = [
    // {
    //     title: 'MAIN FILM',
    //     src: '/videos/SOMA2025_motionposter.mp4'
    // },
    {
        title: 'AGIOTITA',
        src: '/videos/team_1_cut_comp.mp4'
    },
    {
        title: 'BIPOLAR',
        src: '/videos/team_2_cut_2560.mp4'
    },
    {
        title: '"- - -"',
        src: '/videos/team_3_cut_comp.mp4'
    },
    {
        title: 'Dialysis',
        src: '/videos/team_4_cut_comp.mp4'
    },
    {
        title: '표류[]기',
        src: '/videos/team_5_cut_comp.mp4'
    },
    {
        title: '자각몽',
        src: '/videos/team_6_cut_comp.mp4'
    },
];

const Home = () => {
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const videoRef = useRef(null);
    // const [setDisableTransition] = useState(false);
    const [progressBarKey, setProgressBarKey] = useState(0);
    const [disableTransition, setDisableTransition] = useState(false);

      useEffect(() => {
    // 페이지 진입 시 스크롤 막기
    document.body.style.overflow = 'hidden';

    // 페이지 나갈 때 원래대로 복구
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => {
            if (!video.duration) return;
            const percent = (video.currentTime / video.duration) * 100;

            // 🔥 줄어드는 순간이면 transition 끈다
            if (percent < progress) {
                setDisableTransition(true);
                setTimeout(() => setDisableTransition(false), 50);
            }

            setProgress(percent);
        };

        const resetProgress = () => setProgress(0);

        video.addEventListener('loadedmetadata', resetProgress);
        video.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            video.removeEventListener('loadedmetadata', resetProgress);
            video.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [currentIndex, progress, setDisableTransition]);

    const goToVideo = (index) => { // 진행 바 초기화 함수
        setDisableTransition(true);           // transition 끄기
        setProgress(0);                       
        setProgressBarKey(prev => prev + 1);  
        setCurrentIndex(index);

        setTimeout(() => {
            setDisableTransition(false);        
        }, 50);
    };

    const handlePrev = () => {
        goToVideo((prev) => (prev === 0 ? videoList.length - 1 : prev - 1));
    };

    const handleNext = () => {
        goToVideo((prev) => (prev === videoList.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className='bg-black'>
            <div
                className="
                bg-black
                relative
                h-[calc(100dvh-52px-64px)]  
                lg:h-[calc(100dvh-190px-64px)]
                flex items-center justify-center
        "
            > {/* 헤더 푸터 길이만큼 빼 */}

                <video
                    ref={videoRef}
                    key={currentIndex} // 인덱스 변경 시마다 새로 로드
                    src={`${process.env.PUBLIC_URL}${videoList[currentIndex].src}`}
                    autoPlay
                    muted
                    loop={false}
                    playsInline
                    onEnded={() => {
                        setCurrentIndex(prev => (prev + 1) % videoList.length);
                        setProgress(0);
                        setProgressBarKey(prev => prev + 1); // 바를 리셋하기 위해 key 변경
                    }}
                    className="w-full h-full object-cover"

                />

                
                {/* <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
                    <div
                        key={progressBarKey}
                        className="h-full bg-black transition-[width] duration-[1000ms] ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div> */}

                {/* 진행 바 */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
                    <div
                        key={progressBarKey}
                        className={`
                        h-full bg-black
                        ${disableTransition ? '' : 'transition-[width] duration-[1000ms] ease-linear'}
                        `}
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* 좌우 버튼 */}
                <div className="hidden lg:flex">
                    <button
                        onClick={handlePrev}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl z-10"
                    >
                        &#10094;
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl z-10"
                    >
                        &#10095;
                    </button>
                </div>
            </div>

            {/* 하단 메뉴 패널 */}
            <div className="hidden lg:flex bg-white w-full flex justify-center border-t border-gray-200">
                {videoList.map((video, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setCurrentIndex(index);
                            setProgress(0);
                            setProgressBarKey(prev => prev + 1);
                        }}
                        className={`
              py-4 px-6 text-lg font-medium relative transition-colors
              ${index === currentIndex ? 'text-black' : 'text-gray-400'}
            `}
                    >
                        {video.title}
                        {index === currentIndex && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
                        )}
                    </button>
                ))}
            </div>


            {/* 하단 메뉴 패널(모바일) */}
            <div className="lg:hidden absolute bottom-0 left-0 w-full bg-white flex items-center justify-between px-4 py-3 z-20">
                <button
                    onClick={handlePrev}
                    className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-full text-xl"
                >
                    &#10094;
                </button>

                <div className="flex flex-col items-center">
                    <span className="text-base font-semibold">{videoList[currentIndex].title}</span>
                </div>

                <button
                    onClick={handleNext}
                    className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-full text-xl"
                >
                    &#10095;
                </button>
            </div>
        </div>
    );
};

export default Home;