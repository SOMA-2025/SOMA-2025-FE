import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import teams from '../data/teams.json';

const API_URL = process.env.REACT_APP_API_URL;

const TeamPage = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // 1. JSON에서 팀 정보 찾기
    const matched = teams.find((t) => t.id === teamId);
    setTeam(matched);

    // 2. DB에서 멤버 정보 가져오기
    const fetchMembers = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/members/team/${teamId}`);
        setMembers(res.data);
      } catch (err) {
        console.error('멤버 불러오기 실패:', err);
      }
    };

    if (matched) {
      fetchMembers();
    }
  }, [teamId]);

  const calculatePaddingTop = () => (3500 / 2333) * 100;

  if (!team) {
    return <p className="text-center py-20 text-xl">팀 정보를 찾을 수 없습니다.</p>;
  }

  return (
    <div className="max-w-[1140px] mx-auto px-4 py-10 space-y-20">
      {/* 1. 포스터 + 설명 */}
      <section className="flex flex-col md:flex-row items-center gap-10">
        <img src={team.poster} alt={team.name} className="w-full md:w-1/2 rounded-lg" />
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-5xl font-bold mb-4">{team.name}</h2>
          <p className="text-lg leading-relaxed whitespace-pre-line">{team.description}</p>
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
        <h3 className="text-xl font-semibold mt-4">{team.name} FILM</h3>
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
                  src={member.profileImageUrl}
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
