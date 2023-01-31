import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const PrivateRouter = () => {
  const { userContext } = useAuthContext();

  return (
    <div>{!userContext ? <Navigate to="/login" replace /> : <Outlet />}</div>
  );
};
export default PrivateRouter;
