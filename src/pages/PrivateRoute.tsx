import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem(import.meta.env.VITE_ACCESS_TOKEN);

  useEffect(() => {
    if (!accessToken) navigate("/member/login");
  }, []);

  return accessToken && element;
};

export default PrivateRoute;
