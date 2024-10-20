import { useNavigate } from "react-router-dom";
import AdminDashboard from "../components/AdminDashboard/AdminDashboard";
import useUserStore from "../store/userStore";

const AdminPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, loading } = useUserStore();

  if (!loading && !isAuthenticated) {
    return navigate("/login");
  } else if (!loading && user.role !== "admin") {
    return navigate("/");
  }
  return <AdminDashboard />;
};

export default AdminPage;
