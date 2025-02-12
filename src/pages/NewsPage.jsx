import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const NewsPage = () => {
  const { id } = useParams(); // URL에서 뉴스 ID 가져오기
  const navigate = useNavigate();
  const { getNewsDetail, loading, error } = useNews();
  const [news, setNews] = useState(null);
  const [isReading, setIsReading] = useState(false); // TTS 상태

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const data = await getNewsDetail(id);
        setNews(data);
      } catch (error) {
        console.error("뉴스 로드 실패: ", error);
      }
    };

    fetchNewsDetail();
  }, [getNewsDetail, id]);

  // TTS(Text-to-Speech) 처리 함수
  const handleTTS = () => {
    setIsReading(!isReading);
    if (!isReading) {
      // TTS 시작
      const utterance = new SpeechSynthesisUtterance(news.content);
      utterance.lang = "ko-KR";
      window.speechSynthesis.speak(utterance);
    } else {
      // TTS 중지
      window.speechSynthesis.cancel();
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">뉴스를 불러오는 중입니다...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">에러가 발생했습니다: {error}</p>
      </div>
    );

  if (!news) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-500 hover:text-blue-600"
          aria-label="이전 페이지로 돌아가기"
        >
          ← 뒤로가기
        </button>

        <article className="bg-white rounded-lg shadow-lg p-6">
          {/* 뉴스 제목 */}
          <h1 className="text-3xl font-bold mb-4">{news.title}</h1>

          {/* 메타 정보 */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-gray-600">
              <span>{news.date}</span>
              {news.author && (
                <span className="ml-4">작성자: {news.author}</span>
              )}
            </div>

            {/* TTS 버튼 */}
            <button
              onClick={handleTTS}
              className={`px-4 py-2 rounded-lg ${
                isReading
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
              aria-label={isReading ? "읽기 중지" : "뉴스 읽어주기"}
            >
              {isReading ? "읽기 중지" : "읽어주기"}
            </button>
          </div>

          {/* 뉴스 내용 */}
          <div className="prose max-w-none">
            {/* 뉴스 이미지가 있다면 표시 */}
            {news.imageUrl && (
              <img
                src={news.imageUrl}
                alt={news.imageAlt || "뉴스 관련 이미지"}
                className="w-full mb-6 rounded-lg"
              />
            )}

            {/* 뉴스 본문 */}
            <div className="text-lg leading-relaxed whitespace-pre-wrap">
              {news.content}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
