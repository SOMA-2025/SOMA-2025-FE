import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <BrowserRouter basename="/2025">
      <div className="min-h-screen bg-black">
        <Header />
        <Routes>
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
