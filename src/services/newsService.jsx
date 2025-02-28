import { API_URL } from "../config/api";
import { authService } from "./authService";

export const newsService = {
  async searchNews(keyword, display = 20) {
    try {
      const response = await fetch(
        `${API_URL}/news/search?keyword=${encodeURIComponent(keyword)}&display=${display}`,
        {
          headers: {
            Authorization: `Bearer ${authService.getToken()}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("뉴스 검색 실패");
      }

      const data = await response.json();
      return data.map((article) => ({
        id: article.link, // 백엔드에서 고유 ID가 없으므로 link를 ID로 사용
        title: article.title.replace(/(<([^>]+)>)/gi, ""), // HTML 태그 제거
        summary: article.description.replace(/(<([^>]+)>)/gi, ""), // HTML 태그 제거
        date: article.pubDate,
        link: article.link,
        originallink: article.originallink,
      }));
    } catch (error) {
      console.error("뉴스 검색 오류:", error);
      throw error;
    }
  },

  async getPopularNews() {
    try {
      const response = await fetch(`${API_URL}/news/popularnews`, {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error("인기 뉴스 로드 실패");
      }

      const data = await response.json();
      return data.map((news) => ({
        id: news.link || news.url, // 링크를 ID로 사용
        title: news.title,
        summary: news.description || news.summary || "",
        date: news.date || news.pubDate || new Date().toLocaleDateString(),
        link: news.link || news.url,
      }));
    } catch (error) {
      console.error("인기 뉴스 로드 오류:", error);
      throw error;
    }
  },

  async getNewsContent(url) {
    try {
      const response = await fetch(`${API_URL}/news/content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authService.getToken()}`,
        },
        body: JSON.stringify({ link: url }),
      });

      if (!response.ok) {
        throw new Error("뉴스 내용 로드 실패");
      }

      return await response.text();
    } catch (error) {
      console.error("뉴스 내용 로드 오류:", error);
      throw error;
    }
  },

  async getTextToSpeech(url) {
    try {
      const response = await fetch(`${API_URL}/news/text-to-speech`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authService.getToken()}`,
        },
        body: JSON.stringify({ link: url }),
      });

      if (!response.ok) {
        throw new Error("음성 변환 실패");
      }

      return await response.arrayBuffer();
    } catch (error) {
      console.error("음성 변환 오류:", error);
      throw error;
    }
  },
};
