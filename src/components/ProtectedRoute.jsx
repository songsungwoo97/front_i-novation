import { Navigate } from "react-router-dom";
import { authService } from "../services/authService";
import PropTypes from "prop-types";

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    // 인증되지 않은 경우 로그인 페이지로 리디렉션
    return <Navigate to="/login" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
