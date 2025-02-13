import React, { useState } from 'react';
import { ShoppingCart, Youtube, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
 const [hoveredNav, setHoveredNav] = useState(null);
 const [isDropdownVisible, setIsDropdownVisible] = useState(false);

 const handleNavEnter = (title) => {
   setHoveredNav(title);
   setIsDropdownVisible(true);
 };

 const handleNavLeave = () => {
   setIsDropdownVisible(false);
 };

 const navItems = [
   {
     title: 'PROJECT',
     description: 'PROJECT 카테고리는 졸업전시회의 메인 페이지로, 팀 선택 화면을 통해 각 팀별 주제를 탐색할 수 있습니다.',
     subItems: ['MAIN THEME', 'LOOK BOOK', 'RUNWAY', 'DESIGNER']
   },
   {
     title: 'STORE',
     description: 'STORE 카테고리는 졸업전시회와 관련된 다양한 상품을 소개하는 공간으로, 관람객이 전시회의 특별한 기념품을 손쉽게 구매할 수 있도록 돕습니다.',
     subItems: ['전체 굿즈', '팀별 굿즈']
   },
   {
     title: 'SHOW INFO',
     description: 'SHOW INFO 카테고리는 졸업전시회의 전반적인 정보를 제공하는 중요한 공간입니다.',
     subItems: ['전시정보', '관람정보', '오시는 길']
   },
   {
     title: 'BEHIND',
     description: 'BEHIND 카테고리는 졸업전시회의 뒷이야기를 담아 관람객에게 새로운 시각을 제공합니다.',
     subItems: ['SHOW BEHIND', 'BROCHURE BEHIND', 'MAKING BEHIND']
   },
   {
     title: 'ARCHIVE',
     description: '과거의 전시 기록들을 보관하고 있습니다.',
     subItems: ['2024:Prototype', '2023', '2022']
   }
 ];

 return (
   <div className="relative" onMouseLeave={handleNavLeave}>
     <header className="w-full bg-black">
       {/* Top Bar */}
       <div className="w-full px-4">
         <div className="flex justify-between items-center h-12">
           {/* Left side with social icons and title */}
           <div className="flex flex-col items-start">
             <h1 className="text-white w-[300px] h-[15px] mb-2 text-sm leading-none">
               2025 KUAD GRADUATION FASHION SHOW
             </h1>
             <div className="flex gap-4">
               <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                 <Youtube className="w-[20px] h-[20px] text-white" />
               </a>
               <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                 <Instagram className="w-[20px] h-[20px] text-white" />
               </a>
             </div>
           </div>

           {/* Cart Icon */}
           <div>
             <button className="relative">
               <ShoppingCart className="w-[20px] h-[20px] text-white" />
             </button>
           </div>
         </div>

         {/* Logo */}
         <div className="text-center py-4">
           <Link to="/" className="inline-block w-[310px] h-[40px] text-white font-bold text-5xl leading-none">
             SOMA
           </Link>
         </div>
       </div>

       {/* Navigation */}
       <nav>
         <div className="mx-auto" style={{ width: '1140px' }}>
           <ul className="flex justify-between py-4">
             {navItems.map((item) => (
               <li
                 key={item.title}
                 className="relative group"
                 onMouseEnter={() => handleNavEnter(item.title)}
               >
                 <Link 
                   to={`/${item.title.toLowerCase()}`} 
                   className="text-white hover:text-gray-300 relative"
                   style={{
                     fontSize: '20px',
                     lineHeight: '30px',
                     display: 'block'
                   }}
                 >
                   {item.title}
                   <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
                 </Link>
               </li>
             ))}
           </ul>
         </div>
       </nav>
     </header>

     {/* Dropdown Menu */}
     {isDropdownVisible && hoveredNav && (
       <div 
         className="absolute w-full bg-white z-50 shadow-lg transition-all duration-300 ease-in-out"
         onMouseEnter={() => setIsDropdownVisible(true)}
       >
         <div className="mx-auto px-8 py-12" style={{ width: '1140px' }}>
           <div className="flex justify-between items-start">
             <div className="w-1/3">
               <h3 className="text-3xl font-bold text-black mb-6">{hoveredNav}</h3>
               <p className="text-gray-600 text-base leading-relaxed">
                 {navItems.find(item => item.title === hoveredNav)?.description}
               </p>
             </div>
             <div className="w-1/4">
               <ul className="space-y-6">
                 {navItems.find(item => item.title === hoveredNav)?.subItems.map((subItem) => (
                   <li key={subItem}>
                     <Link 
                       to={`/${hoveredNav.toLowerCase()}/${subItem.toLowerCase()}`} 
                       className="text-black text-lg hover:text-gray-600 transition-colors duration-200"
                     >
                       {subItem}
                     </Link>
                   </li>
                 ))}
               </ul>
             </div>
           </div>
         </div>
       </div>
     )}
   </div>
 );
};

export default Header;