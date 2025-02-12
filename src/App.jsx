import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { MainPage } from "./pages/MainPage";
import { SearchPage } from "./pages/SearchPage";
import { TrendingPage } from "./pages/TrendingPage";
import { NewsPage } from "./pages/NewsPage";

export const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto p-6">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/popular" element={<TrendingPage />} />
            <Route path="/news/:id" element={<NewsPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};
