import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [teams, setTeams] = useState([]);

  console.log('API_URL:', process.env.REACT_APP_API_URL);
  console.log('BASE_URL:', process.env.REACT_APP_BASE_URL);

  // fetchAllMembers와 searchMembers를 하나의 함수로 통합
  const fetchMembers = useCallback(async (term) => {
    try {
      const response = await axios.get(`${API_URL}/api/members/search`, {
        params: {
          keyword: term
        }
      });
      setTeams(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  }, []);

  useEffect(() => {
    fetchMembers(searchTerm);
  }, [searchTerm, fetchMembers]);

  // 2333:3500 비율로 계산하는 함수 (약 0.6666 : 1)
  const calculatePaddingTop = () => {
    return (3500 / 2333) * 100; // 약 150%
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full px-4 py-4 md:py-8">
        <div className="mx-auto relative w-full max-w-7xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 md:h-12 pl-12 pr-4 border border-gray-300 rounded-none focus:outline-none focus:border-black"
            placeholder="검색어를 입력하세요"
          />
        </div>
      </div>

      <div className="w-full px-4">
        {teams.map((team) => (
          <div key={team.teamName} className="mx-auto mb-8 md:mb-16 w-full max-w-7xl">
            <div className="mb-4 md:mb-8">
              <Link 
                to={`${BASE_URL}/team/${team.teamPageUrl}`}
                className="text-xl md:text-3xl font-bold hover:text-gray-600 transition-colors"
              >
                {team.teamName}
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
              {team.members.map((member) => (
                <Link 
                  key={member.name}
                  to={`${BASE_URL}/portfolio/${member.portfolioUrl}`}
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;