import React from 'react';
import { useParams } from 'react-router-dom';
import members from '../data/members.json';

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

  return (
    <div className="max-w-[1140px] mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/2">
          <img
            src={require(`../${member.runwayImageUrl}`)}
            alt={`${member.name} runway`}
            className="w-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify center">
          <img
            src={require(`../${member.profileImageUrl}`)}
            alt={`${member.name} profile`}
            className="w-96 h-96 object-contain mb-4 self-center"
          />
          <h1 className="text-3xl font-bold">{member.name} / {member.englishName}</h1>
          <h2 className="text-xl font-semibold mt-2">{member.projectTitle}</h2>
          <p className="mt-4 whitespace-pre-line">{member.description}</p>
          <div className="mt-6 space-y-1">
            <p>📧 {member.email}</p>
            <p>📱 {member.instagram}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
