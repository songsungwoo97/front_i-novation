// src/hooks/useNews.jsx
import { useState } from "react";
import { newsService } from "../services/newsService";

export const useNews = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchNews = async (keyword, display = 20) => {
    try {
      setLoading(true);
      setError(null);
      return await newsService.searchNews(keyword, display);
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getPopularNews = async () => {
    try {
      setLoading(true);
      setError(null);
      return await newsService.getPopularNews();
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getNewsDetail = async (url) => {
    try {
      setLoading(true);
      setError(null);
      const content = await newsService.getNewsContent(url);
      return {
        id: url,
        content,
        title: "뉴스 상세",
        date: new Date().toLocaleDateString(),
        url,
      };
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getNewsAudio = async (url) => {
    try {
      setLoading(true);
      setError(null);
      return await newsService.getTextToSpeech(url);
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    searchNews,
    getPopularNews,
    getNewsDetail,
    getNewsAudio,
    loading,
    error,
  };
};
