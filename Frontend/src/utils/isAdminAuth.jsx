import { Outlet } from "react-router-dom";
import { decodeToken, isExpired } from "react-jwt";
import NotFound from "../pages/notFound/notFound";

const IsAdminAuth = () => {
  const token = localStorage.getItem("token");
  const check = decodeToken(token);
  // console.log(isExpired(token));

  return check && !isExpired(token) && check.role == 1 ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <NotFound />
  );
};

export default IsAdminAuth;
