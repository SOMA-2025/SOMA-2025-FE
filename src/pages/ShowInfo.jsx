import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const sections = [
    {
        key: 'exhibition',
        title: '전시 안내',
        leftImg: '/2025/image/전시안내_모바일_1.jpg',
        rightImg: '/2025/image/전시안내_모바일_2.jpg',
        pcImg: '/2025/image/전시안내.jpg',
    },
    {
        key: 'staffRoll',
        title: '팀 크레딧',
        leftImg: '/2025/image/팀크레딧_모바일_1.jpg',
        rightImg: '/2025/image/팀크레딧_모바일_2.jpg',
        pcImg: '/2025/image/팀크레딧.jpg',
    },
    {
        key: 'location',
        title: '오시는 길',
        leftImg: '/2025/image/오시는길_모바일_1.jpg',
        rightImg: '/2025/image/오시는길_모바일_2.jpg',
        pcImg: '/2025/image/오시는길.jpg',
    },
];


const ShowInfo = () => {
    const { section } = useParams();
    const navigate = useNavigate();

    const currentIndex = sections.findIndex(s => s.key === section);
    const current = sections[currentIndex] || sections[0];

    const goToPrev = () => {
        const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
        navigate(`/show-info/${sections[prevIndex].key}`);
    };

    const goToNext = () => {
        const nextIndex = (currentIndex + 1) % sections.length;
        navigate(`/show-info/${sections[nextIndex].key}`);
    };

    return (
        <div className="w-full flex flex-col items-center py-12 px-4">
            {/* PC */}
            <img
                src={current.pcImg}
                alt={`${current.title} 데스크탑`}
                className="hidden md:block w-full max-w-[900px] h-auto object-contain"
            />

            {/* 모바일 */}
            <div className="flex flex-col gap-6 justify-center items-center md:hidden">
                <img
                    src={current.leftImg}
                    alt={`${current.title} 왼쪽`}
                    className="w-full max-w-[600px] h-[600px] object-contain"
                />
                <img
                    src={current.rightImg}
                    alt={`${current.title} 오른쪽`}
                    className="w-full max-w-[600px] h-[600px] object-contain"
                />
            </div>

            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex items-center space-x-12 bg-white px-4 py-2 rounded-full shadow-md">
                <button onClick={goToPrev}>
                    <ChevronLeft className="w-6 h-6 hover:text-gray-500" />
                </button>
                <span className="text-base font-medium whitespace-nowrap">{current.title}</span>
                <button onClick={goToNext}>
                    <ChevronRight className="w-6 h-6 hover:text-gray-500" />
                </button>
            </div>
        </div>
    );
};

export default ShowInfo;
