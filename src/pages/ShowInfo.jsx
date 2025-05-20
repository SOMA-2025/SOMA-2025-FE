import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const sections = [
    { key: 'exhibition', title: '전시 안내', imgSrc: '/2025/image/전시안내.jpg' },
    { key: 'visitor', title: '좌석 안내', imgSrc: '/2025/image/좌석배치표.jpg' },
    { key: 'location', title: '오시는 길', imgSrc: '/2025/image/약도수정2.jpg' },
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
                <img
                    src={current.imgSrc}
                    alt={current.title}
                    className="h-[600px] w-auto object-contain"
                />
            </div>

            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center space-x-12 bg-white px-4 py-2 rounded-full shadow-md">
                <button onClick={goToPrev}>
                    <ChevronLeft className="w-6 h-6 hover:text-gray-500" />
                </button>
                <span className="text-base font-medium">{current.title}</span>
                <button onClick={goToNext}>
                    <ChevronRight className="w-6 h-6 hover:text-gray-500" />
                </button>
            </div>
        </div>
    );
};

export default ShowInfo;
