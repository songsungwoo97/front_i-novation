import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { useAuth } from "../hooks/useAuth";

export const MainPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div>
      <Header title="뉴스 서비스" />
      <div className="space-y-4">
        <button
          onClick={() => navigate("/search")}
          className="w-full p-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          뉴스 검색
        </button>
        <button
          onClick={() => navigate("/popular")}
          className="w-full p-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          인기 뉴스
        </button>
        <button
          onClick={handleLogout}
          className="w-full p-4 bg-red-500 text-white rounded hover:bg-red-600 mt-8"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};
