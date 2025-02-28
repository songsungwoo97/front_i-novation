import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { MainPage } from "./pages/MainPage";
import { SearchPage } from "./pages/SearchPage";
import { PopularPage } from "./pages/PopularPage";
import { NewsPage } from "./pages/NewsPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto p-6">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <SearchPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/popular"
              element={
                <ProtectedRoute>
                  <PopularPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/news/:url"
              element={
                <ProtectedRoute>
                  <NewsPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
