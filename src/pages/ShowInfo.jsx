import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const sections = [
    {
        key: 'exhibition',
        title: '전시 안내',
        leftImg: '/2025/image/전시안내.jpg',
        rightImg: '/2025/image/전시안내_텍스트.jpg',
    },
    {
        key: 'visitor',
        title: '좌석 안내',
        leftImg: '/2025/image/좌석안내.jpg',
        rightImg: '/2025/image/좌석배치표_설명.jpg',
    },
    {
        key: 'location',
        title: '오시는 길',
        leftImg: '/2025/image/오시는길.jpg',
        rightImg: '/2025/image/약도수정2_텍스트.jpg',
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
            <div className="flex flex-col items-center">
                <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                    <img
                        src={current.leftImg}
                        alt={`${current.title} 왼쪽`}
                        className="w-full md:w-1/2 max-w-[600px] h-[600px] object-contain"
                    />
                    <img
                        src={current.rightImg}
                        alt={`${current.title} 오른쪽`}
                        className="w-full md:w-1/2 max-w-[600px] h-[600px] object-contain"
                    />
                </div>
            </div>

            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center space-x-12 bg-white px-4 py-2 rounded-full shadow-md">
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
