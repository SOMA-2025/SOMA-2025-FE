import React from 'react';

const archives = [
  {
    year: 2024,
    url: 'https://kuad-archive.com/2024/',
    imageUrl: '/2025/image/poster_2024.png', // 퍼블릭 폴더 기준 경로
  },
  // 추후 연도 추가 가능
];

const ArchivePage = () => {
  return (
    <div className="max-w-[1140px] mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6">ARCHIVE</h1>
      <p className="mb-10 text-gray-600">이전 졸업전시회 웹사이트를 모았습니다.</p>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {archives.map(archive => (
          <a
            key={archive.year}
            href={archive.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative w-full h-64">
              <img
                src={archive.imageUrl}
                alt={`${archive.year} Graduation Poster`}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-lg font-semibold p-4">
                {archive.year} KUAD GRADUATION FASHION SHOW
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ArchivePage;
