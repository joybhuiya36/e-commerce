import React, { useState } from "react";
import logo from "../../assets/logo.png";
import SearchBar from "../search/searchBar";
import "./header1.style.scss";
import Login from "../form/login";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../redux/slices/userSlice";
import { CgProfile } from "react-icons/cg";
import SignUp from "../form/signup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header1 = () => {
  const isUser = useSelector((state) => state.user.role);
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleLogout = () => {
    console.log("logout");
    dispatch(userLogout());
    localStorage.removeItem("token");
    toast("Logged Out!");
    navigate("/");
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img
          src={logo}
          style={{ height: "4em", marginLeft: "3em", marginTop: ".7em" }}
        />
        <SearchBar />
        <div className="headerbtn">
          {isUser ? (
            <div className="profileIcon">
              <CgProfile
                style={{ fontSize: "2em" }}
                onClick={() => navigate("/profile")}
              />
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div>
              <button onClick={() => setLoginModal(true)}>Login</button>
              <button onClick={() => setSignupModal(true)}>Sign Up</button>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
      <Login isOpen={loginModal} onclose={setLoginModal} />
      <SignUp isOpen={signupModal} onclose={() => setSignupModal(false)} />
    </>
  );
};

export default Header1;
