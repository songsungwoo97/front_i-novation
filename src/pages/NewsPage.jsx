import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useNews } from "../hooks/useNews";

export const NewsPage = () => {
  const { url } = useParams(); // URL에서 인코딩된 뉴스 URL을 가져옴
  const navigate = useNavigate();
  const { getNewsDetail, getNewsAudio, loading, error } = useNews();
  const [news, setNews] = useState(null);
  const [isReading, setIsReading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      // URL 디코딩
      const decodedUrl = decodeURIComponent(url);
      const data = await getNewsDetail(decodedUrl);
      if (data) setNews(data);
    };

    fetchNewsDetail();
  }, [url, getNewsDetail]);

  const handleTTS = async () => {
    if (isReading) {
      // 이미 읽고 있다면 중지
      setIsReading(false);
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      }
    } else {
      // 읽기 시작
      try {
        setIsReading(true);
        // URL 디코딩
        const decodedUrl = decodeURIComponent(url);
        const audioData = await getNewsAudio(decodedUrl);

        if (audioData) {
          const blob = new Blob([audioData], { type: "audio/mpeg" });
          const url = URL.createObjectURL(blob);
          setAudioUrl(url);

          const audio = new Audio(url);
          audio.onended = () => {
            setIsReading(false);
          };
          audio.play();
        }
      } catch (err) {
        console.error("음성 재생 오류:", err);
        setIsReading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">뉴스를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">에러가 발생했습니다: {error}</p>
      </div>
    );
  }

  if (!news) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-500 hover:text-blue-600"
        >
          ← 뒤로가기
        </button>

        <article className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-4">{news.title}</h1>

          <div className="flex justify-between items-center mb-6">
            <div className="text-gray-600">
              <span>{news.date}</span>
              {news.author && (
                <span className="ml-4">작성자: {news.author}</span>
              )}
            </div>

            <button
              onClick={handleTTS}
              className={`px-4 py-2 rounded-lg ${
                isReading
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
            >
              {isReading ? "읽기 중지" : "읽어주기"}
            </button>
          </div>

          <div className="prose max-w-none">
            <div className="text-lg leading-relaxed whitespace-pre-wrap">
              {news.content}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
