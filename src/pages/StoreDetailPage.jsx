import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate  } from 'react-router-dom';
import axios from 'axios';

// 환경 변수에서 API URL 가져오기
const API_URL = process.env.REACT_APP_API_URL || '';

const StoreDetailPage = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [teams, setTeams] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // navigation hook 사용

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 팀 정보 가져오기
        console.log('Fetching teams from:', `${API_URL}/api/store/teams`);
        const teamsResponse = await axios.get(`${API_URL}/api/store/teams`);
        console.log('Teams response:', teamsResponse.data);
        setTeams(teamsResponse.data);
        
        // 상품 상세 정보 가져오기
        console.log('Fetching item from:', `${API_URL}/api/store/items/${itemId}`);
        const itemResponse = await axios.get(`${API_URL}/api/store/items/${itemId}`);
        console.log('Item response:', itemResponse.data);
        setItem(itemResponse.data);
        
        setLoading(false);
      } catch (err) {
        setError('상품을 불러오는 중 오류가 발생했습니다');
        setLoading(false);
        console.error('Error fetching item:', err);
        console.error('Error details:', err.response ? err.response.data : err.message);
      }
    };

    fetchData();
  }, [itemId]);

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

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    // 로컬 스토리지에서 장바구니 불러오기
    const savedCart = localStorage.getItem('cart');
    let cart = savedCart ? JSON.parse(savedCart) : [];
    
    // 현재 상품 추가
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: quantity,
      imagePath: item.itemImagePath,
      teamId: item.teamId,
      teamName: item.teamName,
      creator: item.creator
    };
    
    // 이미 장바구니에 있는지 확인
    const existingItemIndex = cart.findIndex(i => i.id === item.id);
    
    if (existingItemIndex >= 0) {
      // 이미 있으면 수량만 증가
      cart[existingItemIndex].quantity += quantity;
    } else {
      // 없으면 새로 추가
      cart.push(cartItem);
    }
    
    // 장바구니 저장
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // 사용자에게 알림
    alert('장바구니에 상품이 추가되었습니다!');
    
    // 장바구니 상태 업데이트를 위한 이벤트 발생
    window.dispatchEvent(new Event('storage'));
  };

  // 바로 주문하기 함수 추가
  const handleDirectCheckout = () => {
    // 현재 상품 정보로 장바구니 아이템 생성
    const checkoutItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: quantity,
      imagePath: item.itemImagePath,
      teamId: item.teamId,
      teamName: item.teamName,
      creator: item.creator
    };
    
    // 바로 주문할 상품만 포함하는 배열을 localStorage에 저장
    localStorage.setItem('selectedCart', JSON.stringify([checkoutItem]));
    
    // 체크아웃 페이지로 이동
    navigate('/checkout');
  };

  if (loading) return (
    <div className="store-page" style={{ backgroundColor: 'white', minHeight: 'calc(100vh - 150px)' }}>
      <div className="mx-auto py-8" style={{ width: '1140px' }}>
        <p className="text-center text-black">로딩 중...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="store-page" style={{ backgroundColor: 'white', minHeight: 'calc(100vh - 150px)' }}>
      <div className="mx-auto py-8" style={{ width: '1140px' }}>
        <p className="text-center text-red-500">{error}</p>
      </div>
    </div>
  );
  
  if (!item) return (
    <div className="store-page" style={{ backgroundColor: 'white', minHeight: 'calc(100vh - 150px)' }}>
      <div className="mx-auto py-8" style={{ width: '1140px' }}>
        <p className="text-center text-black text-lg">상품을 찾을 수 없습니다.</p>
      </div>
    </div>
  );

  // 팀 이름 가져오기
  const teamName = item.teamName || '';

  return (
    <div className="store-page" style={{ backgroundColor: 'white', minHeight: 'calc(100vh - 150px)' }}>
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb border-t border-b border-gray-300 py-2 px-4">
        <div className="mx-auto" style={{ width: '1140px' }}>
          <nav className="text-sm text-black">
            <Link to="/store" className="hover:underline">STORE</Link>
            {' > '}
            <Link to={`/store/team/${item.teamId}`} className="hover:underline">
              {teamName}
            </Link>
            {' > '}
            <span>{item.name}</span>
          </nav>
        </div>
      </div>
      
      {/* Team Categories */}
      <div className="team-categories border-b border-gray-300 py-3 px-4">
        <div className="mx-auto" style={{ width: '1140px' }}>
          <ul className="flex space-x-4">
            <li className="text-black">
              <Link to="/store/all">전체보기</Link>
            </li>
            {teams.map(team => (
              <li 
                key={team.id} 
                className={`${team.id === item.teamId ? 'font-bold' : ''} text-black`}
              >
                <Link to={`/store/team/${team.id}`}>{team.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Product Detail Content */}
      <div className="mx-auto py-12" style={{ width: '1140px' }}>
        <div className="flex gap-16">
          {/* Product Image */}
          <div className="w-1/2">
            <div>
              <img 
                src={getImageSrc(item.itemImagePath)} 
                alt={item.name} 
                className="w-full h-auto object-cover"
                onError={(e) => {
                  console.error('Image failed to load:', item.itemImagePath);
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/500x500?text=No+Image';
                }}
              />
            </div>
          </div>
          
          {/* Product Info */}
          <div className="w-1/2">
            <h1 className="text-3xl font-medium text-black mb-2">{item.name}</h1>
            <p className="text-xl text-gray-800 mb-6">{Number(item.price).toLocaleString()} ₩</p>
            
            <div className="mb-8">
              <p className="text-gray-700 mb-1">제작자: {item.creator}</p>
              <p className="text-gray-700">팀: {teamName}</p>
            </div>
            
            {/* Quantity Selector */}
            <div className="mb-8">
              <p className="text-gray-700 mb-2">수량:</p>
              <div className="flex">
                <button 
                  className="w-8 h-8 flex items-center justify-center border border-gray-300"
                  onClick={decrementQuantity}
                >
                  -
                </button>
                <input 
                  type="number" 
                  value={quantity} 
                  onChange={handleQuantityChange}
                  className="w-12 h-8 text-center border-t border-b border-gray-300"
                  min="1"
                />
                <button 
                  className="w-8 h-8 flex items-center justify-center border border-gray-300"
                  onClick={incrementQuantity}
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-4">
              <button 
                className="w-1/2 py-3 bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
                onClick={handleAddToCart}
              >
                장바구니 담기
              </button>
              <button 
                className="w-1/2 py-3 bg-white text-indigo-600 font-medium border border-indigo-600 hover:bg-indigo-50 transition-colors"
                onClick={handleDirectCheckout} // 바로 주문하기 함수 연결
              >
                바로 주문하기
              </button>
            </div>
          </div>
        </div>
        
        {/* Description Image */}
        {item.descriptionImagePath && (
          <div className="mt-16">
            <img 
              src={getImageSrc(item.descriptionImagePath)} 
              alt={`${item.name} 상세 설명`} 
              className="w-full h-auto"
              onError={(e) => {
                console.error('Description image failed to load:', item.descriptionImagePath);
                e.target.onerror = null;
                e.target.src = null;
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreDetailPage;