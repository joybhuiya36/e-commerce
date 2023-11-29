import { Outlet } from "react-router-dom";
import { decodeToken } from "react-jwt";
import NotFound from "../pages/notFound/notFound";

const IsUser = () => {
  const token = localStorage.getItem("token");
  const check = decodeToken(token);
  // console.log(check);

  return check && (check.role == 1 || check.role == 2) ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <NotFound />
  );
};

export default IsUser;
