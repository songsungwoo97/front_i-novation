import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NewsCard } from "../components/NewsCard";
import { useNews } from "../hooks/useNews";

export const PopularPage = () => {
  const navigate = useNavigate();
  const { getPopularNews, loading, error } = useNews();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchPopularNews = async () => {
      try {
        const data = await getPopularNews();
        setResults(data);
      } catch (error) {
        console.error("인기 뉴스 로드 실패: ", error);
      }
    };

    fetchPopularNews();
  }, [getPopularNews]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => navigate("/")}
          className="mb-4 text-blue-500 hover:text-blue-600"
          aria-label="메인 페이지로 돌아가기"
        >
          ← 뒤로가기
        </button>

        {/* 제목 */}
        <h1 className="text-2xl font-bold mb-6">인기 뉴스</h1>

        {/* 로딩 상태 */}
        {loading && <div className="text-center py-4">로딩 중...</div>}

        {/* 에러 상태 */}
        {error && (
          <div className="text-red-500 text-center py-4">
            오류가 발생했습니다: {error}
          </div>
        )}

        {/* 뉴스 목록 */}
        <div className="space-y-4">
          {results.map((news) => (
            <NewsCard
              key={news.id}
              title={news.title}
              summary={news.summary}
              date={news.date}
              onClick={() => navigate(`/news/${news.id}`)}
            />
          ))}
        </div>

        {/* 뉴스가 없을 때 */}
        {!loading && !error && results.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            인기 뉴스가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};
