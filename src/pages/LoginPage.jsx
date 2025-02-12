import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const LoginPage = () => {

  const navigate = useNavigate();
  const [login, loading, error] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result) navigate('/');
  };

  return (
    
  );
}