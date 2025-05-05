import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

// 환경 변수에서 API URL 가져오기
const API_URL = process.env.REACT_APP_API_URL || '';

const StorePage = () => {
  const [items, setItems] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // URL 파라미터에서 teamId 가져오기
  const { teamId } = useParams();
  
  // 전체보기 여부 결정
  const isAllView = !teamId;
  
  // 선택된 팀 정보
  const [selectedTeam, setSelectedTeam] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 팀 정보 가져오기
        console.log('Fetching teams from:', `${API_URL}/api/store/teams`);
        const teamsResponse = await axios.get(`${API_URL}/api/store/teams`);
        console.log('Teams response:', teamsResponse.data);
        setTeams(teamsResponse.data);
        
        // teamId가 제공된 경우 해당 팀 찾기
        if (teamId) {
          // eslint-disable-next-line eqeqeq
          const team = teamsResponse.data.find(t => t.id === Number(teamId));
          setSelectedTeam(team);
        }
        
        // 상품 목록 가져오기
        let itemsUrl = isAllView 
          ? `${API_URL}/api/store/items` 
          : `${API_URL}/api/store/items/team/${teamId}`;
          
        console.log('Fetching items from:', itemsUrl);
        const itemsResponse = await axios.get(itemsUrl);
        console.log('Items response data:', itemsResponse.data);
        console.log('Items count:', itemsResponse.data.length);
        setItems(itemsResponse.data);
        
        setLoading(false);
      } catch (err) {
        setError('상품을 불러오는 중 오류가 발생했습니다');
        setLoading(false);
        console.error('Error fetching data:', err);
        console.error('Error details:', err.response ? err.response.data : err.message);
      }
    };
    
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId, isAllView]);

  // 이미지 경로 처리 함수
  const getImageSrc = (imagePath) => {
    try {
      // assets/ 경로로 시작하는 경우 require로 가져오기
      if (imagePath && imagePath.startsWith('assets/')) {
        return require(`../${imagePath}`);
      }
      return imagePath || 'https://via.placeholder.com/300x300?text=No+Image';
    } catch (error) {
      console.error('Error loading image:', error);
      return 'https://via.placeholder.com/300x300?text=Error+Loading+Image';
    }
  };

  return (
    <div className="store-page" style={{ backgroundColor: 'white', minHeight: 'calc(100vh - 150px)' }}>
      
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb border-t border-b border-gray-300 py-2 px-4">
        <div className="mx-auto" style={{ width: '1140px' }}>
          <nav className="text-sm text-black">
            <Link to="/store" className="hover:underline">STORE</Link>
            {' > '}
            <Link to="/store/all" className="hover:underline">
              {isAllView ? '전체보기' : (selectedTeam?.name || '카테고리')}
            </Link>
          </nav>
        </div>
      </div>
      
      {/* Team Categories */}
      <div className="team-categories border-b border-gray-300 py-3 px-4">
        <div className="mx-auto" style={{ width: '1140px' }}>
          <ul className="flex space-x-4">
            <li className={`${isAllView ? 'font-bold' : ''} text-black`}>
              <Link to="/store/all">전체보기</Link>
            </li>
            {teams.map(team => (
              <li 
                key={team.id} 
                // eslint-disable-next-line eqeqeq
                className={`${teamId === String(team.id) ? 'font-bold' : ''} text-black`}
              >
                <Link to={`/store/team/${team.id}`}>{team.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Items Grid with white background */}
      <div className="items-grid bg-white py-8">
        <div className="mx-auto" style={{ width: '1140px' }}>
          {loading ? (
            <p className="text-center text-black">로딩 중...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : items.length === 0 ? (
            <div className="flex justify-center items-center" style={{ minHeight: '300px' }}>
              <p className="text-center text-black text-lg">표시할 상품이 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-x-[60px] gap-y-[40px]">
              {items.map(item => (
                <div key={item.id} className="item-card">
                  <Link to={`/store/item/${item.id}`}>
                    <div className="w-[340px] h-[340px] overflow-hidden mb-3 bg-gray-100">
                      <img 
                        src={getImageSrc(item.itemImagePath)}
                        alt={item.name}
                        className="w-full h-full object-cover object-center"
                        onError={(e) => {
                          console.error('Image failed to load:', item.itemImagePath);
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/300x300?text=Error+Loading+Image';
                        }}
                      />
                    </div>
                    <div className="text-gray-800 mb-1">{item.creator}</div>
                    <h3 className="text-lg font-medium text-black">{item.name}</h3>
                  </Link>
                  <p className="text-gray-800">{item.price ? Number(item.price).toLocaleString() : '0'} ₩</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StorePage;