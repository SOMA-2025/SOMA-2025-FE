import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import SearchPage from "./pages/SearchPage";
import StorePage from "./pages/StorePage";
import StoreDetailPage from "./pages/StoreDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderCompletePage from "./pages/OrderCompletePage";
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminReceiptDetail from './pages/AdminReceiptDetail';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter basename="/2025">
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* 기존 경로 */}
          <Route path="/search" element={<SearchPage />} />
          
          {/* 스토어 관련 경로 - teamName 대신 teamId 사용 */}
          <Route path="/store" element={<Navigate to="/store/all" />} />
          <Route path="/store/all" element={<StorePage />} />
          <Route path="/store/team/:teamId" element={<StorePage />} />
          <Route path="/store/item/:itemId" element={<StoreDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order-complete/:receiptId" element={<OrderCompletePage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/receipt/:id" element={<AdminReceiptDetail />} />
          
          {/* 404 페이지 */}
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center h-screen">
              <div className="mt-20 text-center">
                <h1 className="text-3xl font-bold mb-4">페이지를 찾을 수 없습니다</h1>
                <p className="mb-8">요청하신 페이지가 존재하지 않습니다.</p>
                <a href="/2025/" className="bg-black text-white px-4 py-2 hover:bg-gray-800 transition">
                  홈으로 돌아가기
                </a>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;