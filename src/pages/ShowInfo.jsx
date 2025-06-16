import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ChevronsDown } from 'lucide-react';   

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
  const current      = sections[currentIndex] || sections[0];

  const goToPrev = () => navigate(`/show-info/${sections[(currentIndex - 1 + sections.length) % sections.length].key}`);
  const goToNext = () => navigate(`/show-info/${sections[(currentIndex + 1) % sections.length].key}`);

  const [showIndicator, setShowIndicator] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      setShowIndicator(window.scrollY <= 80);
    };

window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full flex flex-col items-center py-12 px-4 relative">
      {/* PC */}
      <img
        src={current.pcImg}
        alt={`${current.title} 데스크탑`}
        className="hidden md:block w-full max-w-[900px] h-auto object-contain"
      />

      {/* 모바일 */}
      <div className="flex flex-col gap-6 justify-center items-center md:hidden">
        <img src={current.leftImg}  alt={`${current.title} #1`} className="w-full max-w-[600px] h-[600px] object-contain" />
        <img src={current.rightImg} alt={`${current.title} #2`} className="w-full max-w-[600px] h-[600px] object-contain" />
      </div>

      {/* 좌우 탭 네비게이션 */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-12 bg-white px-4 py-2 rounded-full shadow-md">
        <button onClick={goToPrev}><ChevronLeft  className="w-6 h-6 hover:text-gray-500" /></button>
        <span className="text-base font-medium whitespace-nowrap">{current.title}</span>
        <button onClick={goToNext}><ChevronRight className="w-6 h-6 hover:text-gray-500" /></button>
      </div>

      {/* 스크롤 인디케이터 */}
      {showIndicator && (
        <div className="md:hidden fixed bottom-[86px] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-pulse pointer-events-none">
          <ChevronsDown className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};

export default ShowInfo;
