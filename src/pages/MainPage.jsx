import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header title="뉴스 서비스" />
      <div className="space-y-4">
        <button onClick={() => navigate("/search")}>뉴스 검색</button>
        <button onClick={() => navigate("/popular")}>인기 뉴스</button>
      </div>
    </div>
  );
};
