import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black">
        <Header />
        <Routes>
          <Route path="/search" element={<SearchPage />} />
          {/* 다른 라우트들... */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;