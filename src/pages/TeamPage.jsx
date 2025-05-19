// src/pages/TeamPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import teams from '../data/teams.json';
import membersData from '../data/members.json';

const TeamPage = () => {
  const { teamId } = useParams();

  // 팀 정보 가져오기
  const team = teams.find((t) => t.id === teamId);
  if (!team) {
    return <div className="text-center py-20">팀 정보를 찾을 수 없습니다.</div>;
  }

  // members.json에서 해당 팀의 멤버 리스트 찾기
  const teamMembersEntry = membersData.find((t) => t.teamPageUrl.toLowerCase() === teamId);
  const members = teamMembersEntry ? teamMembersEntry.members : [];

  const calculatePaddingTop = () => (3500 / 2333) * 100; // 비율 유지용

  return (
    <div className="max-w-[1140px] mx-auto px-4 py-10 space-y-20">
      {/* 1. 포스터 + 설명 */}
      <section className="flex flex-col md:flex-row items-center gap-10">
        <img src={team.poster} alt={team.name} className="w-full md:w-1/2" />
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-5xl font-bold mb-4">{team.name}</h2>
          <p className="whitespace-pre-line text-lg leading-relaxed">{team.description}</p>
        </div>
      </section>

      {/* 2. 유튜브 */}
      <section className="text-center">
        <div className="w-full max-w-5xl mx-auto aspect-video">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${team.youtubeId}`}
            title={`${team.name} Teaser`}
            frameBorder="0"
            allowFullScreen
          />
        </div>
        <h3 className="text-xl font-semibold mt-4">{team.name} Teaser</h3>
      </section>

      {/* 3. 멤버 목록 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">TEAM {team.name}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
          {members.map((member) => (
            <Link
              key={member.name}
              to={`/portfolio/${member.portfolioUrl}`}
              className="block group"
            >
              <div
                className="bg-gray-100 mb-2 md:mb-4 relative"
                style={{ paddingTop: `${calculatePaddingTop()}%` }}
              >
                <img
                  src={require(`../${member.profileImageUrl}`)}
                  alt={member.name}
                  className="absolute top-0 left-0 w-full h-full object-contain"
                />
              </div>
              <h3 className="text-base md:text-xl font-medium group-hover:text-gray-600 transition-colors truncate">
                {member.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
