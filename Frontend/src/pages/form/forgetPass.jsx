import React, { useState } from "react";
import "./forgetPass.style.scss";
import axiosIntance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    axiosIntance
      .post("/auth/forget-password", { recipient: email })
      .then((res) => {
        toast("An Email is Sent!");
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        toast(err.response.data.message);
      });
  };
  return (
    <div className="forgetDiv">
      <h2>Forget Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label> <br />
        <input
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <br />
        <button type="submit" disabled={loading == true}>
          {loading ? <span>Loading...</span> : <span>Confirm Email</span>}
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
