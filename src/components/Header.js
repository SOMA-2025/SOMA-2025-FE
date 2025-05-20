import React, { useState, useEffect } from 'react';
import {
  ShoppingCart,
  Youtube,
  Instagram,
  Menu,
  X,
  ArrowLeft
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [hoveredNav, setHoveredNav] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const navigate = useNavigate();

  // 모바일 상태
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  // 장바구니 아이템 수를 계산
  useEffect(() => {
    const calculateCartItems = () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const cartItems = JSON.parse(savedCart);
        setCartItemCount(cartItems.length);
      }
    };

    calculateCartItems();

    // 로컬 스토리지 변경을 감지하여 장바구니 수 업데이트
    window.addEventListener('storage', calculateCartItems);

    return () => {
      window.removeEventListener('storage', calculateCartItems);
    };
  }, []);

  const handleNavEnter = (title) => {
    setHoveredNav(title);
    setIsDropdownVisible(true);
  };

  const handleNavLeave = () => {
    setHoveredNav(null);
    setIsDropdownVisible(false);
  };

  const closeMobile = () => {
    setIsMobileOpen(false);
    setSelectedMenu(null);
  };

  // 장바구니 페이지로 이동
  const handleCartClick = () => {
    navigate('/cart');
    if (isMobileOpen) {
      closeMobile();
    }
  };

  const navItems = [
    {
      title: 'PROJECT',
      description: `Project 카테고리는 졸업전시회의 다양한 콘텐츠를
담고있는 공간입니다.

이 카테고리는 졸업전시회의 전반적인 주제와 관련된 콘텐츠를 통해 관람객이 전시회를 이해하고 즐길 수 있도록 돕습니다. 또한, 팀별 주제와 룩북, 쇼 런웨이, 디자이너의 작품을 통해 학생들의 다양한 아이디어와 작품들을 소개합니다.`,
      subItems: [
        { name: 'MAIN THEME', path: '/project/main-theme' },
        { name: 'LOOK BOOK', path: '/project/look-book' },
        { name: 'RUNWAY', path: '/project/runway' },
        { name: 'DESIGNER', path: '/search' }
      ]
    },
    {
      title: 'STORE',
      description: `STORE 카테고리는 졸업전시회와 관련된 다양한 상품들을 소개하는 공간입니다.
     
이곳에서는 학생들이 직접 제작한 특별한 굿즈를 만나볼 수 있으며, 관람객이 전시회의 기념품을 소장할 수 있도록 돕습니다.`,
      subItems: [
        { name: '전체 굿즈', path: '/store/all' },
        // { name: '팀별 굿즈', path: '/store/team' }
      ]
    },
    {
      title: 'SHOW INFO',
      description: `SHOW INFO 카테고리는 졸업전시회의 전반적인 정보를 제공하는 공간입니다.

이 카테고리는 관람객이 전시회를 쉽게 이해하고 즐길 수 있도록 전시정보와 관람정보를 제공하고, 오시는 길에 대한 정보도 함께 안내합니다.`,
      subItems: [
        { name: '전시 안내', path: '/show-info/exhibition' },
        { name: '좌석 안내', path: '/show-info/visitor' },
        { name: '오시는 길', path: '/show-info/location' }
      ]
    },
    {
      title: 'BEHIND',
      description: `BEHIND 카테고리는 졸업전시회의 비하인드 스토리를 담은 공간입니다.
     
이 카테고리는 전시회와 관련된 다양한 비하인드
콘텐츠를 통해 관람객이 전시의 제작 과정과 준비과정을 이해하고 감상할 수 있도록 돕습니다.`,
      subItems: [
        { name: 'SHOW BEHIND', path: '/behind/show' },
        { name: 'BROCHURE BEHIND', path: '/behind/brochure' },
        { name: 'MAKING BEHIND', path: '/behind/making' }
      ]
    },
    {
      title: 'ARCHIVE',
      description: `ARCHIVE 카테고리는 이전 졸업전시회 웹사이트 링크를 모아둔 공간입니다.
     
이곳에서는 과거 전시회의 다양한 콘텐츠와 내용을
쉽게 찾아볼 수 있습니다. 졸업전시회의 역사를 되짚어보며, 졸업생들의 작품과 성과를 다시 한 번 감상할 수 있는 기회를 제공합니다.`,
      subItems: [
        { name: '2024:Prototype', path: '/2024' },
        // { name: '2023', path: '/archive/2023' },
        // { name: '2022', path: '/archive/2022' }
      ]
    }
  ];

  return (
    <div className="relative">
      {/* 데스크탑 헤더 & 네비 (md 이상) */}
      <div className="hidden lg:block">
        <header className={`w-full transition-colors duration-300 ${hoveredNav ? 'bg-black' : 'bg-white'}`}>
          <div className="w-full px-4">
            <div className="flex justify-between h-12">
              <div className="flex flex-col mt-4">
                <h1 className={`w-[400px] h-[15px] mb-2 text-sm leading-none font-medium transition-colors duration-300 ${hoveredNav ? 'text-white' : 'text-black'
                  }`}>
                  2025 KUAD GRADUATION FASHION SHOW
                </h1>
                <div className="flex gap-4">
                  <a href="https://www.youtube.com/@kuappareldesign" target="_blank" rel="noopener noreferrer">
                    <Youtube className={`w-[25px] h-[25px] transition-colors duration-300 ${hoveredNav ? 'text-white' : 'text-black'
                      }`} />
                  </a>
                  <a href="https://www.instagram.com/kuad_archive/" target="_blank" rel="noopener noreferrer">
                    <Instagram className={`w-[25px] h-[25px] transition-colors duration-300 ${hoveredNav ? 'text-white' : 'text-black'
                      }`} />
                  </a>
                </div>
              </div>
              <div className="flex flex-col mt-4">
                <div className="h-[15px] mb-2" />
                <button onClick={handleCartClick} className="relative">
                  <ShoppingCart className={`w-[25px] h-[25px] transition-colors duration-300 ${hoveredNav ? 'text-white' : 'text-black'
                    }`} />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
            <div className="text-center py-4">
              <Link
                to="/"
                className={`inline-block w-[310px] h-[40px] font-bold text-5xl leading-none transition-colors duration-300 ${hoveredNav ? 'text-white' : 'text-black'
                  }`}
              >
                SOMA
              </Link>
            </div>
          </div>
        </header>

        <div className="relative" onMouseLeave={handleNavLeave}>
          <nav className={`w-full transition-colors duration-300 ${hoveredNav ? 'bg-black' : 'bg-white'}`}>
            <div className="mx-auto" style={{ width: '1140px' }}>
              <ul className="flex justify-between py-4">
                {navItems.map(item => (
                  <li
                    key={item.title}
                    className="relative group"
                    onMouseEnter={() => handleNavEnter(item.title)}
                  >
                    <Link
                      to={`/${item.title.toLowerCase()}`}
                      className={`relative transition-colors duration-300 font-bold ${hoveredNav ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-600'
                        }`}
                      style={{ fontSize: '22px', lineHeight: '30px', display: 'block' }}
                    >
                      {item.title}
                      <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full ${hoveredNav ? 'bg-white' : 'bg-black'
                        }`} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {isDropdownVisible && hoveredNav && (
            <div
              className="absolute w-full bg-white z-50 shadow-lg transition-all duration-300 ease-in-out"
              onMouseEnter={() => setIsDropdownVisible(true)}
            >
              <div className="mx-auto" style={{ width: '1140px' }}>
                <div className="flex items-start">
                  <div className="w-1/3 pt-12 pb-20">
                    <h3 className="text-3xl font-bold text-black mb-6">{hoveredNav}</h3>
                    <p className="text-gray-600 text-base leading-relaxed whitespace-pre-line">
                      {navItems.find(i => i.title === hoveredNav)?.description}
                    </p>
                  </div>
                  <div className={`pt-16 pb-20 ${hoveredNav === 'PROJECT' ? 'ml-[132px]' : 'ml-[425px]'
                    }`}>
                    <ul className="space-y-6">
                      {navItems.find(i => i.title === hoveredNav)?.subItems.map(sub => (
                        <li key={sub.name} className="relative group">
                          {sub.path === '/2024' ? (
                            <a
                              href="/2024"
                              className="text-black text-lg font-medium hover:text-gray-600 transition-colors duration-200 relative"
                            >
                              {sub.name}
                              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-200 group-hover:w-full" />
                            </a>
                          ) :
                            (<Link
                              to={sub.path}
                              className="text-black text-lg font-medium hover:text-gray-600 transition-colors duration-200 relative"
                            >
                              {sub.name}
                              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-200 group-hover:w-full" />
                            </Link>)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 모바일 헤더 & 메뉴 (md 미만) */}
      <div className="lg:hidden">
        {/* 상단 바 */}
        <div className="sticky top-0 left-0 right-0 z-50 flex items-center justify-between bg-white px-4 py-3 shadow-sm">
          <Link to="/" className="text-xl font-bold">SOMA</Link>
          <div className="flex items-center space-x-4">
            <button onClick={handleCartClick} className="relative">
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button onClick={() => { setIsMobileOpen(o => !o); setSelectedMenu(null); }}>
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* 백드롭 */}
        {isMobileOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 z-50" onClick={closeMobile} />
        )}

        {/* 1차 메뉴 패널 (화면 절반) */}
        <div
          className={`
            fixed top-0 right-0 bottom-0 w-[288px] bg-white z-50
            transform transition-transform duration-300
            ${(isMobileOpen) ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <div className="pt-20 px-6 pb-20 overflow-y-auto h-full relative">
            <button
              className="absolute top-4 right-4"
              onClick={closeMobile}
            >
              <X size={24} />
            </button>

            <ul className="space-y-6">
              {navItems.map(item => (
                <li key={item.title}>
                  <button
                    className="w-full text-left text-2xl font-semibold uppercase"
                    onClick={() => setSelectedMenu(item)}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>

            {/* 모바일 장바구니 버튼 */}
            <div className="mt-10">
              <button
                className="flex items-center gap-2 text-lg font-medium"
                onClick={handleCartClick}
              >
                <ShoppingCart className="w-5 h-5" />
                장바구니
                {cartItemCount > 0 && (
                  <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>

            {/* 하단 SNS 링크 */}
            <div className="absolute bottom-6 left-6 flex space-x-4">
              <a href="https://www.instagram.com/kuad_archive/" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.youtube.com/@kuappareldesign" target="_blank" rel="noopener noreferrer">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* 2차 서브 메뉴 패널 */}
        <div
          className={`
            fixed top-0 right-0 bottom-0 w-[276px] bg-white z-50 shadow-lg
            transform transition-transform duration-300
            ${selectedMenu ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b">
            <button onClick={() => setSelectedMenu(null)}>
              <ArrowLeft size={24} />
            </button>
            <h2 className="font-semibold text-lg">{selectedMenu?.title}</h2>
            <button onClick={closeMobile}>
              <X size={24} />
            </button>
          </div>
          <div className="px-6 pt-4 pb-20 overflow-y-auto h-full relative">
            <ul className="space-y-4">
              {selectedMenu?.subItems.map(sub => (
                <li key={sub.name}>
                  {sub.path === '/2024' ? (
                    <a
                      href="/2024"
                      className="block text-base font-medium"
                      onClick={closeMobile}
                    >
                      {sub.name}
                    </a>
                  ) :
                    (<Link
                      to={sub.path}
                      className="block text-base font-medium"
                      onClick={closeMobile}
                    >
                      {sub.name}
                    </Link>)}
                </li>
              ))}
            </ul>
            {/* 하단 SNS 링크 */}
            <div className="absolute bottom-6 left-6 flex space-x-4">
              <a href="https://www.instagram.com/kuad_archive/" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.youtube.com/@kuappareldesign" target="_blank" rel="noopener noreferrer">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;