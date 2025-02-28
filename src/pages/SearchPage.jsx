import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNews } from "../hooks/useNews";
import { SearchBar } from "../components/SearchBar";
import { NewsCard } from "../components/NewsCard";
import { Pagination } from "../components/Pagination";

export const SearchPage = () => {
  const navigate = useNavigate();
  const { searchNews, loading, error } = useNews();
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const itemsPerPage = 10;

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCurrentPage(1); // 검색 시 첫 페이지로 리셋
    await fetchResults();
  };

  const fetchResults = async () => {
    if (!searchTerm.trim()) return;

    const data = await searchNews(searchTerm, itemsPerPage);
    if (data) {
      setResults(data);
      setTotalResults(data.length); // 백엔드가 총 결과 수를 반환한다면 그것을 사용
    }
  };

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    // 백엔드가 페이지네이션을 지원한다면 여기서 새 페이지 데이터를 요청
    await fetchResults();
  };

  // 뉴스 세부 페이지로 이동 시 URL 인코딩
  const navigateToDetail = (newsUrl) => {
    const encodedUrl = encodeURIComponent(newsUrl);
    navigate(`/news/${encodedUrl}`);
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate("/")}
        className="mb-4 text-blue-500 hover:text-blue-600"
      >
        ← 뒤로가기
      </button>

      <h1 className="text-2xl font-bold mb-6">뉴스 검색</h1>

      <SearchBar
        value={searchTerm}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      {loading && <div className="text-center py-4">검색 중...</div>}

      {error && (
        <div className="text-center py-4 text-red-500">에러: {error}</div>
      )}

      <div className="grid gap-4 mt-4">
        {results.map((news) => (
          <NewsCard
            key={news.id || news.link}
            title={news.title}
            summary={news.summary}
            date={news.date}
            onClick={() => navigateToDetail(news.link)}
          />
        ))}
      </div>

      {results.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalResults / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      )}

      {!loading && !error && results.length === 0 && searchTerm && (
        <div className="text-center py-4 text-gray-500">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
};
