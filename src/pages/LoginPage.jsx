import { useEffect } from "react";
import Login from "../components/Login/Login";
import useUserStore from "../store/userStore";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useUserStore();

  useEffect(() => {
    isAuthenticated && navigate("/");
  }, [isAuthenticated]);

  return <Login />;
};

export default LoginPage;
