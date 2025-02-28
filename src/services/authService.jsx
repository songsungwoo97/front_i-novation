import { API_URL } from "../config/api";

export const authService = {
  async login(email, password) {
    const response = await fetch(`${API_URL}/members/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "로그인 실패");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    return data;
  },

  async register(email, password, name) {
    const response = await fetch(`${API_URL}/members/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "회원가입 실패");
    }

    return await response.json();
  },

  async logout() {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`${API_URL}/members/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("token");
      return response.ok;
    } catch (error) {
      console.error("로그아웃 실패:", error);
      localStorage.removeItem("token");
    }
  },

  isAuthenticated() {
    return !!localStorage.getItem("token");
  },

  getToken() {
    return localStorage.getItem("token");
  },
};
