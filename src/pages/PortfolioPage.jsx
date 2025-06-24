import React from 'react';
import { useParams } from 'react-router-dom';
import members from '../data/members.json';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Mail, Instagram } from 'lucide-react';

const PortfolioPage = () => {
  const { portfolioUrl } = useParams();

  // 모든 멤버를 하나의 배열로 평탄화
  const allMembers = members.flatMap(team => team.members);
  const member = allMembers.find(m => m.portfolioUrl === portfolioUrl);

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">해당 멤버를 찾을 수 없습니다.</p>
      </div>
    );
  }

  /* ---------- 슬라이드 소스 선택 ---------- */
  const slides = member.slides?.length ? member.slides : member.brochureImages?.map(src => ({
    type: 'image',
    src,
  })) || [];

  return (
    <div className="max-w-[1140px] mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-10">
        {/* ------------------- 슬라이더 ------------------- */}
        <div className="w-full md:w-1/2 order-2 md:order-1">
          {slides.length ? (
            <Swiper
              spaceBetween={20}
              navigation
              modules={[Navigation]}
              className="w-full select-none"
            >
              {slides.map((item, idx) => (
                <SwiperSlide key={idx}>
                  {item.type === 'image' ? (
                    <img
                      src={require(`../${item.src}`)}
                      alt={`슬라이드 ${idx + 1}`}
                      className="w-full object-contain"
                    />
                  ) : (
                    <div className="w-full aspect-[3/4]">
                      <iframe
                        title={`iframe-${idx}`}
                        src={item.src}
                        frameBorder="0"
                        width="100%"
                        height="100%"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p>슬라이드가 없습니다.</p>
          )}
        </div>

        {/* ------------------- 텍스트 영역 ------------------- */}
        <div className="w-full md:w-1/2 py-4 flex flex-col justify-center order-1 md:order-2">
          <img
            src={require(`../${member.profileImageUrl}`)}
            alt={`${member.name} profile`}
            className="w-96 h-96 object-contain mb-4 self-center"
          />
          <h1 className="text-xl font-semibold">
            {member.name} / {member.englishName}
          </h1>
          <h2 className="text-2xl font-bold mt-2">{member.projectTitle}</h2>
          <p className="mt-4 whitespace-pre-line">{member.description}</p>

          {(member.email || member.instagram) && (
            <div className="mt-6 space-y-2">
              <h3 className="text-lg font-semibold uppercase tracking-wide mb-2">Contact</h3>

              {member.instagram && (
                <a
                  href={`https://instagram.com/${member.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-black hover:no-underline"
                >
                  <Instagram size={18} strokeWidth={1.5} />
                  {member.instagram}
                </a>
              )}

              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-2 text-black hover:no-underline"
                >
                  <Mail size={18} strokeWidth={1.5} />
                  {member.email}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
