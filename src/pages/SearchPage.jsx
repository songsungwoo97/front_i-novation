import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNews } from "../../hooks/useNews";
import { SearchBar } from "../../components/SearchBar";
import { NewsCard } from "../../components/NewsCard";
import { Pagination } from "../../components/Pagination";

export const SearchPage = () => {
  const navigate = useNavigate(); //페이지 이동을 위해
  const { searchNews, loading, error } = useNews();
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = async (keyword) => {
    const data = await searchNews(keyword, currentPage);
    if (data) setResults(data);
  };

  return (
    <div className="container mx-auto p-4">
      <SearchBar onSubmit={handleSearch} />
      {loading && <div>검색 중...</div>} {/*음성 추가하자*/}
      {error && <div>에러: {error}</div>}
      <div className="grid gap-4 mt-4">
        {results.map((news) => (
          <NewsCard
            key={news.id}
            {...news}
            onClick={() => navigate(`/news/${news.id}`)}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(results.length / 10)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
