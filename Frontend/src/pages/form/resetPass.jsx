import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./resetPass.style.scss";
import { toast } from "react-toastify";
import axios from "axios";
import axiosIntance from "../../utils/axiosInstance";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token, userId } = useParams();
  const [pass, setPass] = useState("");
  const [conPass, setConPass] = useState("");
  const [err, setErr] = useState("");
  useEffect(() => {
    axiosIntance
      .post("/auth/reset-request", { token, userId })
      .then((res) => {})
      .catch((err) => {
        navigate("/invalid-token");
        return;
      });
  });
  //   console.log(token, userId);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (pass != conPass) {
      setErr("Password doesn't match with given password");
      return;
    }
    // console.log(pass);
    axiosIntance
      .post("/auth/reset-password", { token, userId, pass })
      .then((res) => {
        console.log(res.data);
        toast("Password is Reset Successfully");
        navigate("/");
      })
      .catch((err) => {
        toast(err.response.data.message);
      });
  };
  return (
    <div className="resetDiv">
      <h2>Reset Password</h2>
      {err.length > 0 && <h5 style={{ color: "red" }}>{err}</h5>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">Password</label> <br />
        <input
          type="text"
          onChange={(e) => {
            setPass(e.target.value);
          }}
          value={pass}
        />
        <br /> <br />
        <label htmlFor="confirmPassword">Confirm Password</label> <br />
        <input
          type="text"
          onChange={(e) => {
            setConPass(e.target.value);
            setErr("");
          }}
          value={conPass}
        />
        <br />
        <button>Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
